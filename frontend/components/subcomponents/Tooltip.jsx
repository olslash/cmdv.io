var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React);

var ToolTip;
module.exports = ToolTip = React.createClass({
  mixins: [FluxMixin],

  propTypes: {},

  getInitialState: function () {
    return {
      hidden: true,
      helpTargets: document.getElementsByClassName('help'),
      text: '',
      top: '0px',
      left: '0px'
    };
  },

  // todo: this component would be more useful if help targets could be dynamically added
  componentDidMount: function () {
    var component = this;
    [].forEach.call(this.state.helpTargets, function (target) {
      var delay;
      target.addEventListener('mouseenter', function (e) {
        delay = window.setTimeout(function () {
          var x = e.x || e.clientX;
          var y = e.y || e.clientY;
          component.setState({text: target.getAttribute('data-help')});
          component.setState({hidden: false});
          component.setState({top: (y + 20) + 'px'});
          component.setState({left: (x - 14) + 'px'});
        }, 1000);
      });

      target.addEventListener('mouseleave', function (e) {
        window.clearTimeout(delay);
        component.setState({hidden: true});
      });
    });
  },

  render: function () {
    var style = {
      visibility: this.state.hidden ? 'hidden' : 'visible',
      top: this.state.top,
      left: this.state.left
    };
    return (
        <div className="explain" style={ style } >
        { this.state.text }
        </div>
    )
  }
});
