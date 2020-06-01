import React from 'react';
import { connect, Provider } from 'react-redux';

import Screen from '../components/Screen';
import Window from '../components/Window';
import Bio from '../components/Content/Bio';
import Google from '../components/Content/Google';
import ACM from '../components/Content/ACM';
import SDHacks from '../components/Content/SDHacks';
import IEEE from '../components/Content/IEEE';

const ScreenContainer = props => {
  return (
    <Provider store={props.store}>
      <Screen>
        <Window>
          {(() => {
            switch (true) {
              case (props.progress < .3):
                return <Bio />;
              case (props.progress < .4):
                return <Google />;
              case (props.progress < .5):
                return <ACM />;
              case (props.progress < .6):
                return <SDHacks />;
              case (props.progress < .65):
                return <IEEE />;
              case (props.progress < .7):
                return <ACM />;
              case (props.progress < .75):
                return <IEEE />;
              case (props.progress < .8):
                return <ACM />;
              case (props.progress < .85):
                return <IEEE />;
              case (props.progress < .9):
                return <ACM />;
              case (props.progress <= 1):
                return <IEEE />;
              default:
                return null;
            }
          })()}
        </Window>
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
