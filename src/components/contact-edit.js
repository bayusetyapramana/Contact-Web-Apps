import React, { Component } from 'react';
import { Form, Grid, Button, Segment, Modal, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {result} from 'lodash';
import {Link} from 'react-router-dom';

const validate = (values) => {
  const errors = {name:{}};
  if(!values.name || !values.name.first) {
    errors.name.first = {
      message: 'You need to provide First Name'
    }
  }
  if(!values.age) {
    errors.age = {
      message: 'You need to provide Age '
    }
  } else if(!/^(?:[0-9] ?){2}$/.test(values.age)) {
    errors.age = {
      message: 'Age must between 10-99'
    }
  }
  return errors;
}

class ContactEdit extends Component {

  state = { modalOpen: false }

  componentWillReceiveProps = (nextProps) => { // Load Contact Asynchronously
    const { contact } = nextProps;
    if(contact._id !== this.props.contact._id) { // Initialize form only once
      this.props.initialize(contact)
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  renderFieldId = ({ input, contact, label, type, meta: { touched, error } }) => (
    <Form.Input className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} disabled/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Input>
  )


  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { handleSubmit, pristine, submitting, loading, contact, data } = this.props;
    console.log('ini data message', data);
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Edit Contact</h1>
             <Segment.Group>
               <Segment>FirstName: {result(contact, 'data.firstName')}</Segment>
                <Segment>LastName: {result(contact, 'data.lastName')}</Segment>
                 <Segment>LastName: {result(contact, 'data.age')}</Segment>
             </Segment.Group>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="firstName" type="text" component={this.renderField} label="First Name"/>
              <Field name="lastName" type="text" component={this.renderField} label="Last Name"/>
            </Form.Group>
            <Field name="age" type="text" component={this.renderField} label="Age"/>
          <Modal
        trigger={  <Button onClick={this.handleOpen} primary type='submit' disabled={pristine || submitting}>Update</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Modal.Content>
          <h3>Succesfully edit contact!</h3>
        </Modal.Content>
        <Modal.Actions>
          <Link to ={'/'}>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Link>
        </Modal.Actions>
      </Modal>
        </Form>

        </Grid.Column>
      </Grid>



    )
  }
}

export default reduxForm({form: 'contact', validate})(ContactEdit);
