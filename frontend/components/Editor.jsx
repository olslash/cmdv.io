var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin,
    helpers = require('../../helpers');

// Editor component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    valueLink: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onDirty: React.PropTypes.func, // function to call when a paste is modified for the first time
    onPasteHighlighted: React.PropTypes.func,
    valueIsPristine: React.PropTypes.bool, // is the content in valueLink an unmodified paste?
    language: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      isClean: this.props.valueIsPristine,
      showEditor: false
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isClean: nextProps.valueIsPristine,
      showEditor: !nextProps.valueIsPristine
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.props.valueLink !== nextProps.valueLink  ||
              this.state.isClean !== nextState.isClean ||
              this.state.showEditor !== nextState.showEditor);
  },

  componentDidUpdate() {
    if(!this.state.showEditor && this.props.valueLink.length !== 0) {
      var forceLanguage = this.props.language ? [this.props.language] : null;
      var highlightResult = hljs.highlightAuto(this.props.valueLink, forceLanguage);
      this.refs['codeBlock'].getDOMNode().innerHTML = highlightResult.value;
      helpers.callAsync(this.props.onPasteHighlighted, null, highlightResult.language);
    }
  },

  _onChange(e) {
    var newValue = e.target.value;

    if(this.state.isClean) {
      this.props.onDirty(newValue);
    } else {
      this.props.onChange(newValue);
    }
  },

  _handleEditorClick() {
    this.setState({
      showEditor: true
    })
  },

  render: function () {
    var contentArea;
    if(this.state.showEditor) {
      contentArea = <textarea value={ this.props.valueLink }
                              onChange={ this._onChange }
                              autoComplete="off"
                              autoCapitalize="none"
                              spellCheck="false"
                              autoFocus />
    } else {
      contentArea = <pre
                        className='contentArea'
                        onClick={ this._handleEditorClick }>
                      <code ref='codeBlock' />
                    </pre>
    }
    return (
      <section id="paste-content">
        { contentArea }
      </section>
    );
  }
});
