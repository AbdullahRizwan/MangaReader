import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase({
    name: 'MainDB',
    location: 'default'
  },
  ()=>{},
  error=>{console.log("Error opening database")}
); 


const SearchScreen = ({navigation}) => {

  const [mangas, setMangas] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  var searchTitle = `https://api.mangadex.org/manga?title=${searchQuery}&limit=10&order[relevance]=desc&includes[]=cover_art`;

  React.useEffect(()=>{
    createTable();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "AnimeList "
            + "(ID Text PRIMARY KEY AUTOINCREMENT, Name TEXT, Image Text);"
        )
    })
  }
  
  function searchTextChange(query){
    setSearchQuery(query)
    axios.get(searchTitle)
    .then(res => {
      setMangas(res.data.data);
    })
  };

  const renderManga = ({ item }) => {
    let name = 'Demo'
    let imageLink = ''
    if(item){
      name = item.attributes.title.en
      for (let attributes of item.relationships) {
        if (attributes.type == 'cover_art')
          imageLink = attributes.attributes.fileName;
          console.log(item.id + "/"+imageLink)
      }
    }
    else{
      console.log(item)
    }
    return (
      <View style={styles.itemWrapperStyle}>
        <Image style={styles.itemImageStyle} source={{
            uri:
              'https://uploads.mangadex.org/covers/'+item.id+'/'+imageLink
          }} />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{`${name}`}</Text>
          <Button>Add</Button>
        </View>
      </View>
    )
  };

  const onChangeSearch = query => searchTextChange(query);

    return (
      <View style={styles.container}>
        <Searchbar
          style={styles.search}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <FlatList data={mangas} renderItem={renderManga} keyExtractor={item => item.id}/>

      </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
    
  },
  itemWrapperStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRightWidth: 1,
    borderLeftWidth: 2,
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    flexShrink: 1,
  },
  txtNameStyle: {
    fontSize: 16,
  },
  
});