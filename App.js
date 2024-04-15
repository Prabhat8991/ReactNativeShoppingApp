import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from './screens/ProductList';
import FavouriteProductsScreen from './screens/FavouriteProductsScreen';
import { Colors } from './colors/colors';
import CartScreen from './screens/CartScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { UseSelector } from 'react-redux';
import Badge from './components/ui/Badge';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from './screens/ProductDetails';

const Stack = createStackNavigator()

export default function App() {

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Products':
        icon = 'tags';
        break;
      case 'FavouriteProducts':
        icon = 'heart';
        break;
    }

    return (
      <AntDesign
        name={icon}
        size={25}
        color={routeName === selectedTab ? Colors.primaryPurple : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };


  function BottomBar() {
    return (
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="ProductTab"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('CartScreen')}
            >
              <AntDesign name={'shoppingcart'} color={Colors.primaryWhite} size={25} />

            </TouchableOpacity>
            <Badge />
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          position="LEFT"
          name="Products"
          component={() => <ProductList />}
        />
        <CurvedBottomBarExpo.Screen
          name="FavouriteProducts"
          component={() => <FavouriteProductsScreen />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="CartScreen"
          component={() => <CartScreen />}
        />
      </CurvedBottomBarExpo.Navigator>
    )
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ProductsTab' component={BottomBar} options={{
            headerShown: false
          }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'red',
    position: 'absolute',
    top: -15,
    left: 30
  },
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryPurple,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});
