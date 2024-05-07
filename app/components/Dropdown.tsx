import * as React from "react"
import { FlatList, Modal, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { translate } from "app/i18n"

export interface DropdownProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  labelTx?: string;
  items: { label: string; value: string }[];
  onChangeText: (value: string) => void;
  onBlur?: () => void;
  value: string;
  error?: string;
  disabled?: boolean;

}

/**
 * Describe your component here
 */
export const Dropdown = observer(function Dropdown(props: DropdownProps) {
  const { style, labelTx,value, error, items, onBlur, onChangeText, disabled } = props
  const $styles = [$container, style]

  const [isOpen, setIsOpen] = React.useState(false);

 const toggleDropdown = () => {
   setIsOpen(!isOpen);
 };

 const handleSelect = (itemValue:string, itemLabel: string) => {
   onChangeText(itemValue);
   setIsOpen(false);
 };
 const selectedLabel = items.find(item => item.value === value)?.label || translate("CreateStudent.dropdownPlaceholder");

  return (
    <View style={$container}>
      <Text style={{fontFamily: typography.primary.semiBold}}>{labelTx}</Text>
      <TouchableOpacity  activeOpacity={0.7} disabled={disabled} onPress={toggleDropdown} style={$dropdown}>
        <Text style={{fontFamily: typography.primary.semiBold}}>{selectedLabel}</Text>
      </TouchableOpacity>
      {error && <Text style={$errorText}>{error}</Text>}
      {isOpen && (
        <View style={$listContainer}>
          {items.map((item) => (
            <TouchableOpacity activeOpacity={0.7} key={item.value} onPress={() => handleSelect(item.value, item.label)} style={$listItem}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  // marginVertical: 10,
}

const $dropdown: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.border,
  padding: 10,
  borderRadius: 5,
};

const $errorText:TextStyle = {
  color: 'red',
  fontFamily: typography.primary.semiBold,
}

const $listContainer: ViewStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  elevation:2,
  // top:70,
  width: '100%',
};

const $listItem: ViewStyle = {
  padding: 10,
};
