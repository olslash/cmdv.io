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
    valueIsPristine: React.PropTypes.bool, // is the content in valueLink an unmodified paste?
    getHighlightedValue: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.getFlux().store('NavigationStore').on('change', this.forceUpdate.bind(this))
  },

  componentWillUnmount() {
    this.removeAllListeners();
  },

  getInitialState() {
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

  render() {
    var contentArea;
    if(this.state.showEditor) {
      contentArea = <textarea value={ this.props.valueLink }
                              onChange={ this._onChange }
                              autoComplete="off"
                              autoCapitalize="none"
                              spellCheck="false"
                              autoFocus />
    } else {
      var highlightedPasteContent = this.props.getHighlightedValue();
      contentArea = <pre
                        className='contentArea'
                        onClick={ this._handleEditorClick }>
                      <code ref='codeBlock'
                            dangerouslySetInnerHTML={{ __html: highlightedPasteContent }} />
                    </pre>
    }
    return (
      <section id="paste-content">
        { contentArea }
      </section>
    );
  }
});
