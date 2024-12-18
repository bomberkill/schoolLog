/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {Icon, IconTypes, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { Appbar } from "react-native-paper"
import RNBiometrics from 'react-native-biometrics';
import AsyncStorage from "@react-native-async-storage/async-storage"
// import AsyncStorage from "@react-native-async-storage/async-storage"
interface AuthScreenProps extends AppStackScreenProps<"Auth"> {}

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen({ navigation }) {
  const [isBiometric, setIsBiometric] = useState(false);
  const [pinCode, setPincode] = useState('');
  const [correctPin, setCorrectPin] =useState("");
  const [errorMessage, setErrorMessage] = useState('');
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const handleBiometricAuth = async () => {
     const biometrics = new RNBiometrics({allowDeviceCredentials: true})
     const pin = await AsyncStorage.getItem("savedPinCode")
     if (pin) {
       setCorrectPin(pin)
     }
     try {
       const { biometryType, available, error } = await biometrics.isSensorAvailable()
       if(available) {
        setIsBiometric(true)
        console.log("bioType types values: ", biometryType)
      }else {
        console.log("bioType error value: ", error)
      }
     } catch (error) {
      console.log("error occured ", error)
    }
  };
  // const createKey = await biometrics.createKeys()
  // AsyncStorage.setItem('biometricPubliKey', createKey.publicKey)
  // console.log('Biometrics saved successfully', createKey.publicKey)
  // const payload = 'authentication payload';
  // const { success, signature } = await biometrics.createSignature({ promptMessage: 'Authenticate', payload });
  // if(success) {
  //   console.log("signature: ", signature)
  // }
  const addDigit =  (num: number) => {
    const actualPin = pinCode + num.toString();
    setPincode(actualPin);
    if (pinCode.length === 3) {
      console.log('pinCode and actualPin',pinCode, actualPin)
      if (actualPin === correctPin) {
        console.log("PIN code matched");
        console.log('pinCode and actual',pinCode, actualPin)
        navigation.navigate('bottomTab')
        setTimeout(()=>setPincode(""), 1000);
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
  const maskedCode = ' * '.repeat(pinCode.length);

  const auth = async () => {
    const biometrics = new RNBiometrics({allowDeviceCredentials: true})
    try {
      const simplePrompt = await biometrics.simplePrompt({
        promptMessage: 'Sign in with Touch ID',
        cancelButtonText: 'Close',
        fallbackPromptMessage: 'too many attempts , use pin code instead'
      });
      if (simplePrompt.success) {
        navigation.navigate('bottomTab')
      }
      console.log("simple prompt",simplePrompt.success, simplePrompt.error);
    } catch (error) {
      console.log('error on try catch', error)
    }
  }
  useEffect(()=> {
    console.log("useEffect start");
    handleBiometricAuth()
  }, [])
  const data = [{num: [1, 2, 3]}, {num: [4, 5, 6]}, {num: [7, 8, 9]}, {num: [isBiometric? "fingerprint" : undefined, 0, "numdel"]}];
  return (
    <View style={$root}>
      <StatusBar barStyle="light-content"/>
      <Appbar.Header style={{backgroundColor: colors.palette.blue200}}>
        <Appbar.Content title={translate("Auth.header")} color={colors.palette.neutral100} titleStyle={{fontFamily: typography.primary.semiBold, alignSelf: "center"}} />
      </Appbar.Header>
      <View style={$container}>
        {/* {!isBiometric &&
          <Text style={{fontFamily: typography.primary.semiBold, color: colors.palette.angry500}}>{translate("Auth.noBiometric")}</Text>
        } */}
        <Text style={{fontFamily: typography.primary.semiBold}}>{translate("Auth.title")}</Text>
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
                  ) : num === 'fingerprint' ? (
                    <View style={$numberStyle}>
                      <Icon onPress={auth} color={colors.palette.blue200} size={spacing.xxl} icon={num as IconTypes} />
                    </View>
                  ) 
                  : (<View style={$numberStyle}></View>)
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