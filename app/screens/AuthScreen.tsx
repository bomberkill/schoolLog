/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StatusBar, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {Text } from "app/components"
import * as LocalAuthenticaion from "expo-local-authentication"
import { SecurityLevel } from "expo-local-authentication"
import PINCode from "@haskkor/react-native-pincode"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { Appbar } from "react-native-paper"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AuthScreenProps extends AppStackScreenProps<"Auth"> {}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen() {
  const [isBiometric, setIsBiometric] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const [biometricType, setBiometricType] = useState<string | undefined>(undefined);
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const checkBiometric = async () => {
    try {
      const type = await LocalAuthenticaion.supportedAuthenticationTypesAsync()
      if(type.length > 1) {
        setIsBiometric(true)
      }
      const getExisringBio: SecurityLevel = await LocalAuthenticaion.getEnrolledLevelAsync()
      switch (getExisringBio) {
        case SecurityLevel.NONE:
          setShowPinCode(true)
        break;
        case SecurityLevel.SECRET:
        break; 
        case SecurityLevel.BIOMETRIC_WEAK || SecurityLevel.BIOMETRIC_STRONG:
          setShowPinCode(true)
        break;         
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=> {
    checkBiometric()
  }, [])
  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
        <Appbar.Content title={translate("common.home")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
      </Appbar.Header>
      <ScrollView style={$container}>
        {isBiometric &&
          <Text style={{fontFamily: typography.primary.semiBold, color: colors.palette.angry500}}>{translate("Auth.noBiometric")}</Text>
        }
        <Text style={{fontFamily: typography.primary.semiBold}}>{translate("Auth.title")}</Text>
        {showPinCode &&(
          <PINCode status="choose" alphabetCharsVisible={false} passwordLength={4} pinCodeVisible />
        )}
      </ScrollView>
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