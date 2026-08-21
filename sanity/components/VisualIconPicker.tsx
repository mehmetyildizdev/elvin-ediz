import { useCallback, useMemo, useState } from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { Dialog, Button, Card, Flex, Box, Text, TextInput, Grid, Stack, Badge } from '@sanity/ui';
import { SearchIcon } from '@sanity/icons/Search';
import { CloseIcon } from '@sanity/icons/Close';
import { ICON_LIBRARY, CATEGORIES, getIconComponent } from '../lib/iconLibrary';

export function VisualIconPicker(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const CurrentIcon = useMemo(() => getIconComponent(value), [value]);

  const currentItem = useMemo(() => ICON_LIBRARY.find((item) => item.name === value), [value]);

  const filteredIcons = useMemo(() => {
    return ICON_LIBRARY.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [search, selectedCategory]);

  const handleSelect = useCallback(
    (iconName: string) => {
      onChange(iconName === 'none' ? unset() : set(iconName));
      setOpen(false);
      setSearch('');
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(unset());
    },
    [onChange]
  );

  return (
    <Stack space={2}>
      {/* Trigger Button */}
      <Flex gap={2} align="center">
        <Button
          mode="ghost"
          tone="default"
          radius={2}
          disabled={readOnly}
          onClick={() => setOpen(true)}
          style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
        >
          <Flex gap={3} align="center" style={{ width: '100%' }}>
            <Card
              padding={2}
              radius={2}
              tone="primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(34, 118, 252, 0.15)',
                border: '1px solid var(--card-border-color, rgba(255, 255, 255, 0.12))',
                width: 36,
                height: 36,
              }}
            >
              {CurrentIcon ? (
                <CurrentIcon size={20} style={{ color: '#38bdf8' }} />
              ) : (
                <Text size={1} muted>
                  —
                </Text>
              )}
            </Card>

            <Stack space={1} flex={1}>
              <Text size={1} weight="semibold">
                {currentItem
                  ? currentItem.label
                  : value && value !== 'none'
                    ? value
                    : 'Choose an Icon...'}
              </Text>
              <Text size={0} muted>
                {currentItem
                  ? `Category: ${currentItem.category} • Key: "${currentItem.name}"`
                  : 'Click to open visual icon browser'}
              </Text>
            </Stack>

            {currentItem && (
              <Badge tone="positive" fontSize={0} padding={2} radius={2}>
                Active
              </Badge>
            )}
          </Flex>
        </Button>

        {value && value !== 'none' && !readOnly && (
          <Button
            icon={CloseIcon}
            mode="bleed"
            tone="critical"
            title="Remove selected icon"
            onClick={handleClear}
            radius={2}
          />
        )}
      </Flex>

      {/* Modal Dialog (Fixed dimensions to prevent layout jumps) */}
      {open && (
        <Dialog
          id="visual-icon-picker-modal"
          header="Select Visual Icon Library"
          onClose={() => {
            setOpen(false);
            setSearch('');
          }}
          width={2}
          zOffset={1000}
        >
          <Box
            padding={4}
            style={{
              width: 660,
              maxWidth: '92vw',
              height: 620,
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              gap: 16,
            }}
          >
            {/* Top Fixed Controls Area */}
            <Stack space={3} style={{ flexShrink: 0 }}>
              {/* Search Bar */}
              <TextInput
                icon={SearchIcon}
                placeholder="Search 65+ icons (e.g. passport, visa, shield, graduation, briefcase)..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                autoFocus
                fontSize={2}
                radius={2}
                clearButton
                onClear={() => setSearch('')}
              />

              {/* Category Filter Tabs */}
              <Flex gap={2} wrap="wrap" align="center">
                {CATEGORIES.map((cat) => {
                  const isCatSelected = selectedCategory === cat.id;
                  const count =
                    cat.id === 'all'
                      ? ICON_LIBRARY.length
                      : ICON_LIBRARY.filter((i) => i.category === cat.id).length;

                  return (
                    <Button
                      key={cat.id}
                      mode={isCatSelected ? 'default' : 'ghost'}
                      tone={isCatSelected ? 'primary' : 'default'}
                      text={`${cat.label} (${count})`}
                      onClick={() => setSelectedCategory(cat.id)}
                      fontSize={1}
                      padding={2}
                      radius={2}
                      selected={isCatSelected}
                    />
                  );
                })}
              </Flex>

              {/* Reset to Number option */}
              <Button
                mode="ghost"
                tone="default"
                text="No Icon (Use Number / Default Prefix Only)"
                selected={!value || value === 'none'}
                onClick={() => handleSelect('none')}
                style={{ width: '100%', padding: '6px' }}
                fontSize={1}
                radius={2}
              />
            </Stack>

            {/* Scrollable Icons Grid - Fixed Flex Container */}
            <Box
              style={{
                flex: 1,
                minHeight: 320,
                overflowY: 'scroll',
                paddingRight: 6,
                boxSizing: 'border-box',
              }}
            >
              <Grid columns={[2, 3, 4, 5]} gap={3}>
                {filteredIcons.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = value === item.name;

                  return (
                    <div
                      key={item.name}
                      onClick={() => handleSelect(item.name)}
                      title={`${item.label} (${item.category})`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        borderRadius: 8,
                        border: isSelected
                          ? '2px solid #38bdf8'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        background: isSelected
                          ? 'rgba(56, 189, 248, 0.18)'
                          : 'rgba(255, 255, 255, 0.04)',
                        minHeight: 90,
                        padding: '12px 6px 10px',
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                        textAlign: 'center',
                      }}
                    >
                      <IconComp
                        size={28}
                        style={{
                          color: isSelected ? '#38bdf8' : '#e2e8f0',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          display: 'block',
                          fontSize: '11px',
                          fontWeight: isSelected ? 600 : 400,
                          lineHeight: '1.2',
                          color: isSelected ? '#38bdf8' : '#cbd5e1',
                          wordBreak: 'break-word',
                          maxWidth: '100%',
                          letterSpacing: 'normal',
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </Grid>

              {filteredIcons.length === 0 && (
                <Box padding={5} style={{ textAlign: 'center' }}>
                  <Text size={2} muted>
                    No matching icons found for &ldquo;{search}&rdquo;
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Dialog>
      )}
    </Stack>
  );
}

export default VisualIconPicker;
