/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, IconTypes, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { Appbar } from "react-native-paper"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SetPinStep1ScreenProps extends AppStackScreenProps<"SetPinStep1"> {}

export const SetPinStep1Screen: FC<SetPinStep1ScreenProps> = observer(function SetPinStep1Screen({navigation}) {
  const [pinCode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const addDigit =  (num: number) => {
    const actualPin = pinCode + num.toString();
    setPincode(actualPin);
    if (actualPin.length === 4) {
      console.log('pinCode and actualPin',pinCode, actualPin)
      navigation.navigate("SetPinStep2", {pinCodeSet: actualPin})
      setPincode("")
      // if (actualPin === correctPin) {
      //   console.log("PIN code matched");
      //   console.log('pinCode and actual',pinCode, actualPin)
      //   navigation.navigate('bottomTab')
      //   setTimeout(()=>setPincode(""), 1000);
      // }else {
      //   console.log("PIN code do not match")
      //   setErrorMessage("PIN code do not match");
      //   setTimeout(()=>setPincode(""), 1000);
      //   setTimeout(()=> setErrorMessage(""), 1000);
      // }
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
        <Text style={{fontFamily: typography.primary.semiBold}}>{translate("setPinStep1.Title")}</Text>
        <View style={$pinDisplay}>
          <Text weight="bold" size="xl" style={{color: colors.palette.blue200}}>{maskedCode}</Text>
          <View style={{marginBottom: spacing.sm, borderBottomColor: colors.palette.neutral900, borderBottomWidth: 1, width: 100}}></View>
          <Text weight="bold" size="sm" style={{color: colors.palette.angry500}}>{errorMessage}</Text>
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