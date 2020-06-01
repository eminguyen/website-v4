import React from 'react';
import { connect, Provider } from 'react-redux';

import Screen from '../components/Screen';

const ScreenContainer = props => {
  return (
    <Provider store={props.store}>
      <Screen>
        {props.progress}
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
