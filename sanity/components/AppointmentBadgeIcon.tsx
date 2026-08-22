import React, { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export function AppointmentBadgeIcon() {
  const client = useClient({ apiVersion: '2025-02-19' });
  const [newCount, setNewCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const count = await client.fetch<number>(
          'count(*[_type == "appointment" && (status == "New" || !defined(status))])'
        );
        if (isMounted) {
          setNewCount(typeof count === 'number' ? count : 0);
        }
      } catch (err) {
        console.error('[AppointmentBadge] Error fetching count:', err);
      }
    };

    fetchCount();

    // Listen to real-time appointment mutations
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      subscription = client
        .listen(
          '*[_type == "appointment"]',
          {},
          { includeDrafts: true, includeResult: true, visibility: 'query' }
        )
        .subscribe(() => {
          fetchCount();
        });
    } catch {
      // Fallback to polling
    }

    // 2-second background polling ensures 100% sync regardless of WebSocket state
    const interval = setInterval(fetchCount, 2000);

    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [client]);

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.25em',
        height: '1.25em',
      }}
    >
      <EnvelopeIcon style={{ fontSize: '1.25em' }} />
      {newCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            width: '9px',
            height: '9px',
            display: 'block',
            pointerEvents: 'none',
          }}
        >
          {/* Animated ping wave */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              backgroundColor: '#f43f5e',
              opacity: 0.75,
              animation: 'sanity-ping-wave 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          {/* Glowing center indicator */}
          <span
            style={{
              position: 'absolute',
              inset: '1px',
              borderRadius: '9999px',
              backgroundColor: '#e11d48',
              boxShadow: '0 0 6px rgba(225, 29, 72, 0.95)',
              border: '1.5px solid var(--card-bg-color, #1e2029)',
            }}
          />
          <style>{`
            @keyframes sanity-ping-wave {
              75%, 100% {
                transform: scale(2.5);
                opacity: 0;
              }
            }
          `}</style>
        </span>
      )}
    </span>
  );
}
