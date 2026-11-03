import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme, radius, spacing, typography, Shadows } from '@/shared/theme';
import { haptics } from '@/shared/utils/haptics';

export interface SelectOption {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
}

export interface CustomSelectProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  error?: string | null;
  testID?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  required = false,
  value,
  placeholder,
  options,
  onSelect,
  error,
  testID,
  leftIcon = 'list-outline',
}) => {
  const theme = getTheme('movie');
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const isPlaceholder = !value || value === '' || value === placeholder;

  const handleOpen = () => {
    haptics.impactLight();
    setModalVisible(true);
  };

  const handleChoose = (optValue: string) => {
    haptics.selection();
    onSelect(optValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        {required && <Text style={styles.requiredAsterisk}> *</Text>}
      </View>

      {/* Trigger Box */}
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.7}
        onPress={handleOpen}
        style={[
          styles.triggerBox,
          {
            borderColor: error ? '#DC2626' : theme.inputBorder,
            backgroundColor: theme.inputBg,
          },
        ]}
      >
        <View style={styles.triggerLeft}>
          <Ionicons
            name={selectedOption?.icon || leftIcon}
            size={18}
            color={selectedOption?.color || (isPlaceholder ? theme.textMuted : theme.primary)}
            style={styles.triggerIcon}
          />
          <Text
            style={[
              styles.triggerText,
              {
                color: isPlaceholder ? theme.textMuted : theme.text,
                fontWeight: isPlaceholder ? '400' : '600',
              },
            ]}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>

        <View style={[styles.chevronBadge, { backgroundColor: '#F1F5F9' }]}>
          <Ionicons name="chevron-down" size={16} color={theme.textMuted} />
        </View>
      </TouchableOpacity>

      {/* Error Message */}
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}

      {/* Modern Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.bottomSheet, { backgroundColor: '#FFFFFF' }]}>
                {/* Drag Handle */}
                <View style={styles.handleBar} />

                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.headerTitleGroup}>
                    <Ionicons name={leftIcon} size={20} color={theme.primary} />
                    <Text style={[styles.modalTitle, { color: theme.text }]}>{label}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close" size={20} color={theme.textMuted} />
                  </TouchableOpacity>
                </View>

                {/* Options List */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.optionsList}
                >
                  {options.map((opt) => {
                    const isSelected = opt.value === value;
                    const isDefault = opt.value === '' || opt.label === placeholder;

                    return (
                      <TouchableOpacity
                        key={opt.label}
                        activeOpacity={0.7}
                        onPress={() => handleChoose(opt.value)}
                        style={[
                          styles.optionItem,
                          isSelected && {
                            backgroundColor: theme.primaryLight,
                            borderColor: theme.primary,
                          },
                          isDefault && !isSelected && {
                            backgroundColor: '#F8FAFC',
                          },
                        ]}
                      >
                        <View style={styles.optionLeft}>
                          {opt.icon ? (
                            <View
                              style={[
                                styles.optionIconCircle,
                                {
                                  backgroundColor: opt.color
                                    ? `${opt.color}15`
                                    : '#E2E8F0',
                                },
                              ]}
                            >
                              <Ionicons
                                name={opt.icon}
                                size={18}
                                color={opt.color || theme.primary}
                              />
                            </View>
                          ) : (
                            <View
                              style={[
                                styles.optionIconCircle,
                                { backgroundColor: '#F1F5F9' },
                              ]}
                            >
                              <Ionicons
                                name="radio-button-off"
                                size={16}
                                color="#94A3B8"
                              />
                            </View>
                          )}
                          <Text
                            style={[
                              styles.optionLabel,
                              {
                                color: isSelected
                                  ? theme.primaryDark
                                  : isDefault
                                  ? theme.textMuted
                                  : theme.text,
                                fontWeight: isSelected ? '700' : '500',
                              },
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </View>

                        {isSelected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={22}
                            color={theme.primary}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.captionBold,
    fontSize: 13,
  },
  requiredAsterisk: {
    color: '#DC2626',
    fontWeight: '700',
  },
  triggerBox: {
    height: 50,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  triggerIcon: {
    marginRight: spacing.sm,
  },
  triggerText: {
    ...typography.body,
    fontSize: 14,
  },
  chevronBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.caption,
    color: '#DC2626',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    maxHeight: '75%',
    ...Shadows.warmGlow,
  },
  handleBar: {
    width: 44,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: radius.full,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: spacing.sm,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsList: {
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionIconCircle: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    ...typography.body,
    fontSize: 14,
  },
});
