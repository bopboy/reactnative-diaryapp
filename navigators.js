import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./screens/Home"
import Write from "./screens/Write"

const Stack = createNativeStackNavigator()

const Navigator = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: true, presentation: "modal" }}
    >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Write" component={Write} />
    </Stack.Navigator>
)
export default Navigator
