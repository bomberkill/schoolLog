import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ClassroomDetailsScreenProps extends AppStackScreenProps<"ClassroomDetails"> {}

export const ClassroomDetailsScreen: FC<ClassroomDetailsScreenProps> = observer(function ClassroomDetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$root} preset="scroll">
      <View>
        <Text text="classroomDetails"/>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
