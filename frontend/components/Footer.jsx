var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React);

// Footer component
module.exports = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    selectedLanguage: React.PropTypes.string,
    allLanguages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onSelectLanguage: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {};
  },

  _onLanguageSelectionChange(e) {
    var newLang = e.target.selectedOptions[0].innerText;
    this.props.onSelectLanguage(newLang);
  },

  render: function () {
    this.props.allLanguages.unshift('');
    return (
      <footer id="footer">
        <div className="footer-content">
          <div className="left">
            <a className="about" href="//github.com/olslash/cmdv.io">[cmdv on github]</a>
          </div>
          <div className="right">
            <select className="lang-select"
                    value={ this.props.selectedLanguage }
                    onChange={ this._onLanguageSelectionChange } >
                // todo: recognize abbreviations for selected languages-- maybe a data- attribute?
              { this.props.allLanguages.map((lang) => <option key  ={ lang }
                                                              value={ lang } >
                                                        { lang }
                                                      </option> )}
            </select>
          </div>
        </div>
      </footer>
    );
  }
});
