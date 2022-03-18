import React from "react";

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
} from "react-native";

import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";

import ServantItem from "../components/ServantItem";

import { IServant } from "../interfaces/IServant";

export default function CRUDScreen() {
  const [title, setTitle] = React.useState<string>("");

  const [servants, setServants] = React.useState<IServant[]>([]);

  const [days, setDays] = React.useState<string>("");

  const [countOfCompletedTasks, setCountOfCompletedTasks] =
    React.useState<number>(0);

  React.useEffect(() => {
    const count = servants.reduce((acc: number, item: IServant) => {
      if (item.isChecked) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setCountOfCompletedTasks(count);

    return () => {
      setCountOfCompletedTasks(0);
    };
  }, [servants]);

  React.useEffect(() => {
    onSnapshot(collection(db, "servants"), (snapshot: any) => {
      setServants(
        snapshot.docs.map(
          (item: QueryDocumentSnapshot) =>
            ({
              ...item.data(),
              idForDocument: item.id,
            } as IServant)
        )
      );
    });
  }, []);

  const addServant = async (): Promise<void> => {
    var RandomNumber = Math.floor(Math.random() * 100) + 1;
    var servant_rarity = 1;
    if (RandomNumber > 30) {
      servant_rarity = 2;
    }
    if (RandomNumber > 60) {
      servant_rarity = 3;
    }
    if (RandomNumber > 95) {
      servant_rarity = 4;
    }
    if (RandomNumber > 98) {
      servant_rarity = 5;
    }

    await addDoc(collection(db, "servants"), {
      isChecked: false,
      title: servant_rarity + " star servant",
      id: Date.now(),
      rarity: Number(servant_rarity),
    } as IServant);
  };

  const updateServant = async (
    idForDocument: string,
    servant: IServant
  ): Promise<void> => {
    const newServants = { ...servant, isChecked: !servant.isChecked };

    await setDoc(doc(db, "servants", idForDocument), newServants);
  };

  const deleteServant = async (idForDocument: string): Promise<void> => {
    await deleteDoc(doc(db, "servants", idForDocument));
  };

  return (
    <View style={styles.container}>
      <View style={styles.servant}>
        <View style={styles.searchContainer}>
          <View style={styles.addButton}>
            <Button
              title="Summon"
              color="#4082f5"
              onPress={() => addServant()}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        {servants.map((servant: IServant) => (
          <ServantItem
            key={servant.id}
            servant={servant}
            deleteServant={() => deleteServant(servant.idForDocument)}
            updateServant={() => updateServant(servant.idForDocument, servant)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  servant: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 5,
    marginTop: 5,
  },
  searchContainer: {
    width: "90%",
    padding: 5,
    borderWidth: 1,
    borderColor: "#4082f5",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textbox: {
    borderWidth: 1,
    borderColor: "#4082f5",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  daysText: {
    marginRight: 5,
  },
  firstLine: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondLine: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    marginTop: 3,
  },
  daysInput: {
    borderWidth: 1,
    borderColor: "#4082f5",
    borderRadius: 3,
    padding: 3,
  },
  addButton: {},
});
