import React from "react";
import ReactDOM, { render } from "react-dom";
import * as DropDown from "./component/dropdown";
import * as Label from "./component/label";
import * as Radio from "./component/radio";
import * as CheckBox from "./component/checkbox";

import App from "./app.jsx";
let settingsGlobal = [];

(function($) {
  $.fn.qtTable = function(options) {
    // This is the easiest way to have default options.
    var settings = $.extend(
      {
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
            it.header.formatters = [
              (label, extra) => {
                let tmpCon = null;

                switch (it.component.type) {
                  case "checkbox":
                    if (it.component.enableGlobal) {
                      tmpCon = (
                        <input
                          type="checkbox"
                          defaultChecked={it.component.initState}
                          onChange={input =>
                            input.target.checked                            
                              ? $(`input[name="${it.property}"]:enabled`).prop(
                                  "checked",
                                  true
                                )
                              : $(`input[name="${it.property}"]:enabled`).prop(
                                  "checked",
                                  false
                                )
                          }
                        />
                      );
                    } else {
                      tmpCon = it.header.label;
                    }
                    break;
                  default:
                    tmpCon = null;
                    break;
                }
                return tmpCon;
              }
            ];
            if (!it.cell) {
              it.cell = [];
            }
            if (!it.cell.formatters) {
              it.cell.formatters = [];
            }
            it.cell.formatters = [
              (value, extra) => {
                let tmpCompo = null;
                let visible = true;
                let title = "";
                if (it.component.visible !== undefined) {
                  visible = it.component.visible;
                  if (typeof it.component.visible === "function") {
                    visible = it.component.visible(extra);
                  }
                }
                if (it.component.title !== undefined) {
                  title = it.component.title;
                  if (typeof it.component.title === "function") {
                    title = it.component.title(extra);
                  }
                }
                switch (it.component.type) {
                  case "label":
                    let mode = "default";
                    if (it.component.mode !== undefined) {
                      mode = it.component.mode;
                      if (typeof it.component.mode === "function") {
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
                        target={it.component.target}
                      />
                    );
                    break;
                  case "radio":
                    tmpCompo = (
                      <Radio.Provider
                        id={it.component.id}
                        extra={extra}
                        property={it.header.property}
                        name={it.component.name}
                        title={it.component.title}
                        value={value}
                      />
                    );
                    break;
                  case "checkbox":
                    let disabled = false;
                    if (it.component.disabled !== undefined) {
                      disabled = it.component.disabled;
                      if (typeof it.component.disabled === "function") {
                        disabled = it.component.disabled(extra);
                      }
                    }

                    tmpCompo = (
                      <CheckBox.Provider
                        id={it.component.id}
                        extra={extra}
                        initState={it.component.initState}
                        disabled={disabled}
                        property={it.header.property}
                        name={it.property}
                        title={it.component.title}
                        value={value}
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
              if (settings.component.visible !== undefined) {
                visible = settings.component.visible;
                if (typeof settings.component.visible === "function") {
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
      if (settings.rows === undefined) {
        settings.rows = cSet.rows;
      }
      if (settings.columns === undefined) {
        settings.columns = cSet.columns;
      }
      if (settings.css === undefined) {
        settings.css = cSet.css;
      }
      if (settings.rowKey === undefined) {
        settings.rowKey = cSet.rowKey;
      }
      if (settings.component === undefined) {
        settings.component = cSet.component;
      }
      if (settings.elementFilter === undefined) {
        settings.elementFilter = cSet.elementFilter;
      }
    }
    if (settings.callBack) settings.callBack.call(settings.rows);

    let cr = Math.random();
    render(
      <App
        selector={this.selector}
        columns={settings.columns}
        css={settings.css}
        rows={settings.rows}
        rowKey={settings.rowKey}
        component={settings.component}
        row={settings.row}
        elementFilter={settings.elementFilter}
        cr={cr}
        action={(rows, selector) => {
          if (selector !== "") settingsGlobal[selector].rows = rows;
        }}
      />,
      this[0]
    );
    return this;
  };
})(jQuery);
