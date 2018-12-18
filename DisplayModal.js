import React from 'react';
import Moment from 'moment';
import { NavBar } from '../components/navbar/NavBar';
import I18n from '../../app/i18n/i18n';
import { SocialIcon, Avatar, Icon } from 'react-native-elements';
import { View, Image, Text, StyleSheet, Modal, Button } from 'react-native';

const DisplayModal = (props) => {
  if (!props.item) {
    return null;
  }
  console.log(props.item);


  return (
    <View style={styles.container}>

      <Modal
        visible={props.display} animationType="slide"
        onRequestClose={() => console.log('closed')}
      >
        <NavBar
          centerTitle={I18n.t('Transaction details')}
          centerStle={{ color: '#fff' }}
          iconSize={30}
          //leftIcon='menu'
          leftOnPress={() => this.props.navigation.openDrawer()}
          //rightIcon='apps'
          rightOnPress={() => this.changeView()}
        />

        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>


            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44, height: 27 }}> <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Date')} : </Text> {Moment(props.item.CreatedOn).format('MMMM Do YYYY, h:mm:ss a')} </Text>


            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44, height: 27 }}> <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Payment mechanism')}  :</Text> {props.item.paymentService} </Text>

            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 , height: 27}}> <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Amount')} :</Text>     {props.item.Amount}     <Text style={{ fontSize: 16, color: 'blue' }}>SDG</Text></Text>

            {props.item.Status === 'Successful' ?

              <View
                style={{
                  flexDirection: 'row'

                }}

              >
                <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Transaction State')}  :</Text>
               <Text style={{ fontSize: 16, color: 'green', paddingLeft: 44 }}>Success</Text>
              </View>


              :

              <View
                style={{
                  flexDirection: 'row'

                }}

              >
                <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Transaction State')}  :</Text>


               <Text style={{ fontSize: 16, color: 'red', paddingLeft: 44 }}>Failed</Text>
              </View>


            }

            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44, height: 44 }}> <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Transaction ID')} :</Text>     {props.item.UUID} </Text>

            <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44, height: 44 }}> <Text style={{ fontSize: 16, color: 'black', paddingLeft: 44 }}>{I18n.t('Payment Type')} : </Text>     {props.item.paymentType} </Text>
          </View>
        </View>
        <Button
          onPress={props.onclose}
          title="Go Back"
          color="#FFA500"
        />

      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  innerContainer: {
    //flexDirection: 'row',
    height: 460,
    //justifyContent: 'space-between',
   
  },
});

export default DisplayModal;
