import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import PropType from 'prop-types';

const { height, width } = Dimensions.get("window");

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static PropType = {
    text: PropType.string.isRequired,
    id: PropType.string.isRequired,
    isCompleted: PropType.bool.isRequired,
    unCompleteToDo: PropType.func.isRequired,
    completeToDo: PropType.func.isRequired,
    updateToDo: PropType.func.isRequired,
    deleteToDo: PropType.func.isRequired,
  };

  state = {
    isEditing: false,
    toDoValue: "",
  };

  render() {

    const { isEditing, toDoValue } = this.state;
    const { text, id, isCompleted, deleteToDo } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleCompleteToDo}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.unCompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              onBlur={this._finishEditing}
              returnKeyType={"done"}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={(event) => {
                event.stopPropagation();
                deleteToDo(id);
              }}
            >
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  
  _toggleCompleteToDo = (event) => {
    event.stopPropagation();
    const { isCompleted, unCompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      unCompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };

  _startEditing = (event) => {
    event.stopPropagation();
    this.setState({
        isEditing: true
    });
  };

  _finishEditing = (event) => {
    event.stopPropagation();
    const { toDoValue } = this.state;
    const { updateToDo, id } = this.props;
    updateToDo(id, toDoValue);
    this.setState({ isEditing: false });
  };

  _controlInput = (text) => {
    this.setState({ toDoValue: text });
  };

}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    width: width / 2,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: "#bbb",
  },
  unCompletedCircle: {
    borderColor: "#F23657",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 20,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  unCompletedText: {
    color: "#353535",
  },
  input: {
    marginVertical: 20,
    width: width / 2
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});