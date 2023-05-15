import { center } from "@shopify/react-native-skia";
import { StyleSheet, Dimensions } from "react-native";
import colors from "./app/config/colors";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: colors.lightPeach,
    // backgroundColor: colors.grey,
  },
  canvas: {
    height: 400,
    width: 400,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    marginTop: -10,
  },
  button: {
    backgroundColor: colors.purple,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
  logoText: {
    fontSize: 50,
    fontWeight: 500,
    color: colors.orangePeach,
    alignSelf: "center",
    marginTop: 150,
  },
  logoContainer: {
    justifyContent: "center",
  },
  bottomContainer: {
    justifyContent: "center",
    height: height / 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.purple,
    marginVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  formButton: {
    backgroundColor: "rgba(255, 157, 71, 1)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "flex-start",
    marginTop: 50,
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 4,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    top: -20,
  },
});

export default styles;
