import React from "react";
import ReactDOM, { render } from "react-dom";
import * as DropDown from "./component/dropdown";
import * as Label from "./component/label";
import App from "./app.jsx";
let settingsGlobal = [];

(function($) {
  $.fn.qtTable = function(options) {
    // This is the easiest way to have default options.
    var settings = $.extend(
      {
        // These are the defaults.
        css: "table table-striped table-hover table-condensed"
      },
      options
    );

    if (settingsGlobal[this.selector] == null) {
      settingsGlobal[this.selector] = settings;

      if (settings.columns) {
        settings.columns.forEach((it, ky) => {
          if (it.component) {
            if (!it.header.formatters) {
              it.header.formatters = [];
            }
            if (!it.cell.formatters) {
              it.cell.formatters = [];
            }
            it.cell.formatters = [
              (value, extra) => {
                let tmpCompo = null;
                let visible = true;
                let title = "";
                if (it.component.visible != undefined) {
                  visible = it.component.visible;
                  if (typeof it.component.visible == "function") {
                    visible = it.component.visible(extra);
                  }
                }

                if (it.component.title != undefined) {
                  title = it.component.title;
                  if (typeof it.component.title == "function") {
                    title = it.component.title(extra);
                  }
                }
                switch (it.component.type) {
                  case "label":
                    let mode = "default";
                    if (it.component.mode != undefined) {
                      mode = it.component.mode;
                      if (typeof it.component.mode == "function") {
                        mode = it.component.mode(extra);
                      }
                    }
                    tmpCompo = (
                      <Label.Provider
                        title={title}
                        mode={mode}
                        id={it.component.id}
                      />
                    );
                    break;
                  case "dropdown":
                    tmpCompo = (
                      <DropDown.Provider
                        items={it.component.items}
                        extra={extra}
                        onHandleClick={it.component.onHandleClick}
                        href={it.component.href}
                        id={it.component.id}
                        title={it.component.title}
                        icon={it.component.icon}
                        size={it.component.size}
                      />
                    );
                    break;
                  default:
                    tmpCompo = null;
                    break;
                }

                return visible ? tmpCompo : "";
              }
            ];
          }
        });
      }

      if (settings.component) {
        let colsOps = settings.columns.filter(el => el.header.option);
        colsOps.forEach(el => {
          if (!el.header.formatters) {
            el.header.formatters = [];
          }
          if (!el.cell.formatters) {
            el.cell.formatters = [];
          }
          el.cell.formatters = [
            (value, extra) => {
              let visible = true;
              if (settings.component.visible != undefined) {
                visible = settings.component.visible;
                if (typeof settings.component.visible == "function") {
                  visible = settings.component.visible(extra);
                }
              }
              return visible ? (
                <DropDown.Provider
                  items={settings.component.items}
                  extra={extra}
                  onHandleClick={settings.component.onHandleClick}
                  href={settings.component.href}
                  id={settings.component.id}
                  title={settings.component.title}
                  icon={settings.component.icon}
                  size={settings.component.size}
                />
              ) : (
                ""
              );
            }
          ];
        });
      }
      // Greenify the collection based on the settings variable.
    } else {
      let cSet = settingsGlobal[this.selector];

      if (settings.rows == undefined) {
        settings.rows = cSet.rows;
      }
      if (settings.columns == undefined) {
        settings.columns = cSet.columns;
      }
      if (settings.css == undefined) {
        settings.css = cSet.css;
      }
      if (settings.rowKey == undefined) {
        settings.rowKey = cSet.rowKey;
      }
      if (settings.component == undefined) {
        settings.component = cSet.component;
      }
    }
    let cr = Math.random();
    render(
      <App
        columns={settings.columns}
        css={settings.css}
        rows={settings.rows}
        rowKey={settings.rowKey}
        component={settings.component}
        row={settings.row}
        cr={cr}
      />,
      this[0]
    );
    return this;
  };
})(jQuery);
