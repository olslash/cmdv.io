var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin;

// Editor component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    valueLink: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onDirty: React.PropTypes.func, // function to call when a paste is modified for the first time
    valueIsPristine: React.PropTypes.bool // is the content in valueLink an unmodified paste?
  },

  getInitialState: function () {
    return {
      isClean: this.props.valueIsPristine
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    // fixme: ugly
    return !!(this.props.valueLink  !== nextProps.valueLink ||
              this.state.isClean    !== nextState.isClean   ||
              this.state.showEditor !== nextState.showEditor);
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isClean: nextProps.valueIsPristine,
      showEditor: !nextProps.valueIsPristine
    });
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
      var highlightResult = hljs.highlightAuto(this.props.valueLink);
      contentArea =
                    <pre
                        className='contentArea'
                        onClick={ this._handleEditorClick }>
                      <code dangerouslySetInnerHTML={{ __html: highlightResult.value }} />
                    </pre>
    }
    return (
      <section id="paste-content">
        { contentArea }
      </section>
    );
  }
});
