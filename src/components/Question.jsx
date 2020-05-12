import React from "react";
import {
  Form,
  Input,
} from "reactstrap";

class Forms extends React.Component {
  render() {
    return (
      <>
      <div className="d-flex align-items-baseline">
      <h2 className="mt-4 mr-2">Q{parseInt(this.props.id)+1}</h2>
      <h4 className="mb-4">
        {this.props.question}
      </h4>
      </div>
      <div className="mb-4">
        <Form>
          <Input
            placeholder="Write your answer here ..."
            rows="5"
            type="textarea"
            value={this.props.response}
            onChange={(e) => {this.props.onAnswerChange(this.props.qid, e.target.value)}}
          />
        </Form>
        </div>
      </>
    );
  }
}

export default Forms;