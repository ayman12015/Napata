import React, { Component } from 'react';
//import I18n from 'react-native-i18n';
//import I18n from 'i18n-js';
import { Platform, StyleSheet, Text, ScrollView, View, AppLoading } from 'react-native';


class LangScreen extends Component {
    state = {}



    // async componentWillMount() {
    //     const localeSet = Expo.Util.getCurrentLocaleAsync().then(function (r) {
    //         I18n.fallbacks = true;
    //         I18n.translations = {
    //             en: {
    //                 pay: 'Pay eng',
    //                 choosePaymentMethod: "Choose a payment method."
    //             },
    //             ar: {
    //                 pay: 'Payer',
    //                 choosePaymentMethod: "السلام عليكم"
    //             },
    //         };
    //         I18n.locale = r;
    //         console.log(r);
    //         return r;
    //     });

    //     // load fonts, load business rules, load locale now.
    //     //Promise.all([...fonts, ...[business, localeSet]])

    //     Promise.all([localeSet])
    // }

    // async componentWillMount() {
    //     await I18n.initAsync();
    // }
    render() {
        return (
            <Text>hello</Text>
        )
    }
}

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
// I18n.fallbacks = true

// I18n.translations = {
//     'en': require('../../assets/i18n/en.json'),
//     'ar': require('../../assets/i18n/ar.json'),
// }

// I18n.translations = {
//   en: {
//     greeting: 'Hi!'
//   },
//   ar: {
//     greeting: 'سلام!'
//   }
// }
export default LangScreen;




// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, ScrollView, View,AppLoading } from 'react-native';
// import I18n, { getLanguages } from 'react-native-i18n';

// // Enable fallbacks if you want `en-US`
// // and `en-GB` to fallback to `en`
// I18n.fallbacks = true;

// // Available languages
// I18n.translations = {
//   'en': require('../../assets/i18n/en.json'),
//   'ar': require('../../assets/i18n/ar.json'),

// };

// export default class extends Component {
//   state = { languages: [],appIsReady: false, };

//   async componentWillMount() {
//     const [dummy, deviceCountry, currentTimeZone ] = await Promise.all([
//       I18n.initAsync(),
//       Expo.Util.getCurrentDeviceCountryAsync(),
//       Expo.Util.getCurrentTimeZoneAsync(), 
//       // I persist the store on a regular basis, and load it here at app startup
//       // load assets and fonts here...
//     ]);

//     this.setState({appIsReady: true }); // when all above promises above are resolved
//   }

//   render() {
//     if (!this.state.appIsReady) {
//         return (

//           <View>
//             <AppLoading />
//           </View>

//         );
//       }

//     return (
//       <ScrollView style={styles.container} bounces={false}>
//         <Text style={styles.title}>Additional methods</Text>



//         <Text style={styles.title}>Demos</Text>

//         <View style={styles.block}>
//           <Text style={styles.label}>I18n.t('greeting')</Text>
//           <Text>{I18n.t('greeting')}</Text>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//     padding: 24,
//     ...Platform.select({
//       ios: { paddingTop: 44 },
//       default: { paddingTop: 24 },
//     }),
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   block: {
//     marginBottom: 16,
//   },
//   label: {
//     fontWeight: '700',
//     marginRight: 8,
//   },
// });