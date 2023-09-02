import { center } from "@shopify/react-native-skia";
import { StyleSheet, Dimensions } from "react-native";
import colors from "./app/config/colors";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "flex-end",
    // backgroundColor: colors.absoluteBlack,
  },
  logoText: {
    position: "absolute",
    fontSize: 80,
    fontWeight: "900",
    color: colors.absoluteBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 10,
    zIndex: 1,
  },
  logoContainer: {
    flex: 1,
    // backgroundColor: colors.absoluteBlack,
    backgroundColor: colors.loginBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    height: height / 2,
    width: width,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.loginBackground,
  },

  button: {
    backgroundColor: colors.grey,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 30,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: colors.absoluteWhite,
    shadowColor: colors.absoluteWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.absoluteWhite,
    letterSpacing: 0.5,
  },

  textInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "white",
    color: "white",
    marginHorizontal: 25,
    marginTop: 30,
    borderRadius: 25,
    paddingLeft: 20,
    backgroundColor: colors.grey,
    shadowColor: colors.absoluteWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
  },
});

export default styles;
