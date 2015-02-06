var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React);

var Footer;
module.exports = Footer = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    selectedLanguage: React.PropTypes.string,
    allLanguages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    languageSelectDisabled: React.PropTypes.bool.isRequired,
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
    this.props.allLanguages.unshift('txt');
    return (
      <footer id="footer">
        <div className="footer-content">
          <div className="left">
            <a className="about" href="//github.com/olslash/cmdv.io">[cmdv on github]</a>
          </div>
          <div className="right">
            <span>language{ this.props.languageSelectDisabled && ' (disabled while editing)' }: </span>
            <select className="lang-select"
                    value   ={ this.props.selectedLanguage }
                    disabled={ this.props.languageSelectDisabled }
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
