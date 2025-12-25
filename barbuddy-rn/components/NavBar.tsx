import { TextInput, StyleSheet, View} from "react-native";

export default function NavBar() {
    return (
        <View style={styles.searchBar}>
            <TextInput 
                style={styles.searchBar}
                placeholder="Search for bars, locations, etc..."
            />
        </View>
    )
};

const styles = StyleSheet.create({
    searchBar:{
        height:50,
        width:'100%',
        backgroundColor:'white',
        borderRadius:10
    }
});

