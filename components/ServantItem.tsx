import React from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import { IServant } from "../interfaces/IServant";

export default function ServantItem({
  servant,
  deleteServant,
  updateServant,
}: any) {
  const servantItem = servant as IServant;

  return (
    <View style={styles.listTile}>
      <View style={styles.lineFirst}>
        <Icon
          name={
            servantItem.isChecked ? "check-circle" : "radio-button-unchecked"
          }
          style={styles.checkIcon}
          size={20}
          color="#666666"
          onPress={() => updateServant(servantItem.idForDocument, servantItem)}
        />
        <Text
          style={styles.title}
          onPress={() => updateServant(servantItem.idForDocument, servantItem)}
        >
          {servantItem.title}
        </Text>
        <Icon
          name="delete"
          style={styles.deleteIcon}
          size={20}
          color="#666666"
          onPress={() => deleteServant(servantItem.idForDocument)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listTile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#666666",
  },
  lineFirst: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  lineSecond: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: "10%",
  },
  deadline: {
    fontSize: 10,
  },
  haveTime: {
    color: "green",
  },
  haveNotTime: {
    color: "red",
  },
  textbox: {
    borderWidth: 1,
    borderColor: "#4082f5",
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 10,
    paddingBottom: -10,
    marginLeft: 5,
  },
  checkIcon: {
    width: "10%",
  },
  title: {
    width: "85%",
    fontSize: 18,
  },
  deleteIcon: {
    width: "5%",
  },
});
