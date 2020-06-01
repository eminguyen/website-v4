import React from 'react';
import { connect, Provider } from 'react-redux';

import Screen from '../components/Screen';
import Window from '../components/Window';
import Bio from '../components/Content/Bio';
import Google from '../components/Content/Google';
import ACM from '../components/Content/ACM';
import SDHacks from '../components/Content/SDHacks';
import IEEE from '../components/Content/IEEE';
import PlaceIt from '../components/Content/PlaceIt';
import Ceres from '../components/Content/Ceres';
import Coronally from '../components/Content/Coronally';
import Learnly from '../components/Content/Learnly';

const ScreenContainer = props => {
  return (
    <Provider store={props.store}>
      <Screen>
          {(() => {
            switch (true) {
              case (props.progress < .3):
                return <Window><Bio /></Window>;
              case (props.progress < .4):
                return <Window><Google /></Window>;
              case (props.progress < .5):
                return <Window><ACM /></Window>;
              case (props.progress < .6):
                return <Window><SDHacks /></Window>;
              case (props.progress < .65):
                return <Window><IEEE /></Window>;
              case (props.progress < .7):
                return <Window><PlaceIt /></Window>;
              case (props.progress < .75):
                return <Window><Coronally /></Window>;
              case (props.progress < .8):
                return <Window><Ceres /></Window>;
              case (props.progress < .85):
                return <Window><Learnly /></Window>;
              case (props.progress < .9):
                return <Window><ACM /></Window>;
              case (props.progress <= 1):
                return <Window><IEEE /></Window>;
              default:
                return null;
            }
          })()}
      </Screen>
    </Provider>
  )
}

const mapStateToProps = state => {
  return {
    progress: state.progress.progress
  }
}

export default connect(
  mapStateToProps,
  {}
)(ScreenContainer);
