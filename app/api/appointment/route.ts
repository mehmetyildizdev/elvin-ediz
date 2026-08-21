import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const projectId =
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
    const dataset =
      process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
    const writeToken = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_WRITE_TOKEN;

    if (!projectId || !writeToken) {
      return NextResponse.json(
        { message: 'Sanity configuration missing or write token not configured.' },
        { status: 500 }
      );
    }

    const id = `appointment-${crypto.randomUUID()}`;
    const mutation = {
      mutations: [
        {
          create: {
            _id: id,
            _type: 'appointment',
            name: String(name).trim(),
            email: String(email).trim(),
            phone: phone ? String(phone).trim() : '',
            service: service ? String(service).trim() : '',
            message: message ? String(message).trim() : '',
            status: 'New',
            receivedAt: new Date().toISOString(),
          },
        },
      ],
    };

    const response = await fetch(
      `https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${writeToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(mutation),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Sanity mutation error: ${err}`);
    }

    if (process.env.APPOINTMENT_WEBHOOK_URL) {
      try {
        await fetch(process.env.APPOINTMENT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            event: 'appointment.created',
            appointment: { id, name, email, phone, service, message },
          }),
        });
      } catch (webhookErr) {
        console.error('Failed to notify appointment webhook:', webhookErr);
      }
    }

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Could not create appointment',
      },
      { status: 500 }
    );
  }
}
