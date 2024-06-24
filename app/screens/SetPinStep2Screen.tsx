/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, IconTypes, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { Appbar } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SetPinStep2ScreenProps extends AppStackScreenProps<"SetPinStep2"> {}

export const SetPinStep2Screen: FC<SetPinStep2ScreenProps> = observer(function SetPinStep2Screen({navigation, route}) {
  const [pinCode, setPincode] = useState('');
  const correctPin = route.params.pinCodeSet;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const addDigit = async  (num: number) => {
    const actualPin = pinCode + num.toString();
    setPincode(actualPin);
    if (pinCode.length === 3) {
      console.log('pinCode and actualPin',correctPin, actualPin)
      if (actualPin === correctPin) {
        console.log("PIN code matched");
        console.log('pinCode and actual',correctPin, actualPin)
        await AsyncStorage.setItem("savedPinCode", actualPin);
        setSuccessMessage("PIN code successfully saved")
        await AsyncStorage.setItem("hasLaunched", "true");
        console.log("firstlaunch save successfully");
        navigation.navigate('bottomTab')
        setTimeout(()=>setPincode(""), 1000);
        setTimeout(()=>setSuccessMessage(""), 1000);
      }else {
        console.log("PIN code do not match")
        setErrorMessage("PIN code do not match");
        setTimeout(()=>setPincode(""), 1000);
        setTimeout(()=> setErrorMessage(""), 1000);
      }
    }
  }
  const removeLastDigit = () => {
    if (pinCode.length > 0) {
      setPincode(prevPin=> prevPin.slice(0, -1));
    }
  }
  const data = [{num: [1, 2, 3]}, {num: [4, 5, 6]}, {num: [7, 8, 9]}, {num: [undefined, 0, "numdel"]}];
  const maskedCode = ' * '.repeat(pinCode.length);
  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
        <Appbar.Content title={translate("setPinStep1.header")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
      </Appbar.Header>
      <View style={$container}>
        <Text style={{fontFamily: typography.primary.semiBold}}>{translate("setPinStep2.Title")}</Text>
        <View style={$pinDisplay}>
          <Text weight="bold" size="xl" style={{color: colors.palette.blue200}}>{maskedCode}</Text>
          <View style={{marginBottom: spacing.sm, borderBottomColor: colors.palette.neutral900, borderBottomWidth: 1, width: 100}}></View>
          <Text weight="bold" size="sm" style={{color: colors.palette.angry500}}>{errorMessage}</Text>
          <Text weight="bold" size="sm" style={{color: colors.palette.success}}>{successMessage}</Text>
        </View>
        <View style={$numView}>
          {data.map((item, index) => (
            <View style={$rowButton} key={index}>
              {item.num.map((num, key)=> (
                <View key={key}>
                  {typeof num === 'number' ? (
                    <TouchableOpacity  activeOpacity={0.7} onPress={()=>addDigit(num)} style={[$numberStyle, {backgroundColor: colors.palette.neutral100}]} key={key}>
                      <Text weight="semiBold" size="lg">{num}</Text>
                    </TouchableOpacity>
                  ) : num === 'numdel' ? (
                    <TouchableOpacity onPress={removeLastDigit} style={[$numberStyle, {backgroundColor: colors.palette.neutral100}]} key={key}>
                      <Icon color={colors.palette.blue200} size={spacing.lg} icon={num as IconTypes} />
                    </TouchableOpacity>
                  ) :(<View style={$numberStyle}></View>)
                  }
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $container:ViewStyle = {
  paddingHorizontal: spacing.md,
  paddingTop: spacing.sm,
}
const $numberStyle:ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: spacing.sm,
}
const $rowButton:ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: "center",
  marginVertical: spacing.xs,
  paddingHorizontal: spacing.xs,
}
const $pinDisplay: ViewStyle = {
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  justifyContent: "center",
  alignItems: "center",
}
const $numView: ViewStyle = {
  marginTop: spacing.md,
}