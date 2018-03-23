# qtTable

## Estructura básica del plugin

```javascript
$("#element").qtTable({
  rowKey: "", //Clave unica de la información
  elementFilter: "", // #ID del elemento donde se crearan los controles de filtros
  css:  "" // Agregar clases a la tabla principal.
  rows: [], //La información
  columns: [] //Definición de las columnas con respecto a la información
});
```

## Definicion de las columnas

### Básica

_Nota: Con la propiedad props puedes agregar cual otra propiedad con el estandar CamelCase_

```javascript
{
  property: "id", //Nombre de la propieda
  header: {
    label: "#" //Texto que se visualizara en el cabecera de la tabla
  },
  props: {
    style: {
      textColor: "red"
    }
  }
}
```

### Editando el formato del renderizado

_Nota: Solo renderiza raw string si por el algun motive este contiene una etiqueta se visualizará el texto de dicha etiqueta_

```javascript
{
  property: "percepcion",
  header: {
    label: "Percepción"
  },
  cell: {
    formatters: [percepcion => "$ " + percepcion]
  }
}
```

### Agregando fitros a columnas especificas e indicando el elemento contenedor

```javascript
{
  property: "nombre_completo",
  header: {
    label: "Nombre"
  },
  filter: {
    control: {
      type: "", //input,input:number,input:checkbox,dropdown,input:button-action
      props: {
        className: "form-control input-sm"
      }
    }
  }
}
```

### Utilizar un componente y filtro dropdown

```javascript
{
  property: "timbrado_sa",
  header: {
    label: "Estatus"
  },
  filter: {
    control: {
      type: "dropdown",
      options: [
        { key: "", value: "TODOS" },
        { key: "value2", value: "value 2" },
        "value3",
        "value4"
      ],
      props: {
        className: "form-control input-sm"
      }
    }
  },
  cell: {},
  component: {
    type: "label",
    mode: function(extra) {
      var mode = "";
      switch (extra.rowData.status) {
        case "ACTIVE":
          mode = "primary";
          break;
        case "CANCEL":
          mode = "danger";
          break;
        default:
          mode = "warning";
          break;
      }
      return mode;
    },
    title: function(extra) {
      return extra.rowData.Estatus;
    },
    id: ""
  }
}
```

### Agregar componente dropdown

```javascript
{
  property: '',
  header: {
    option: true,
    label: 'Opciones',
  },
  props: {
    className: 'text-right'
  },
  cell: {
  },
  component:{
    type:"dropdown",
    items:[
      {
        title:'Timbrar',
        href:'#',
        visible: function(extra){
          return extra.rowData.status == "CANCEL" && extra.rowData.process == "0";
        },
        onHandleClick: function(event,extra){
          event.preventDefault();
          method(extra);
        }
      },
      {
        title:'Cancelar',
        href:'#',
        visible: function(extra){
          return extra.rowData.process == "1" && extra.rowData.estatus == "ACTIVE";
        },
        onHandleClick: function(event,extra){
          event.preventDefault();
          method(extra);
        }
      },
      {
        title:'Ver XML',
        target:'_blank',
        href:function(extra){
          return '/url/'+extra.rowData.id;
        },
        visible: function(extra){
          return extra.rowData.status == "1";
        }
      },
      {
        title:'Ver Log',
        href:'#',
        onHandleClick: function(event,extra){
          event.preventDefault();
          method(extra);
        }
      }
    ],
    href: '',
    id: '',
    size:'xs',
    title: '',
    icon:'glyphicon glyphicon-option-vertical'
  }
}
```
