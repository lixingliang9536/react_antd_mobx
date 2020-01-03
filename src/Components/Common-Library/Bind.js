export default function bind(key, ctx, model){
  if(!ctx){
    ctx = this
  }

  if(!model && ctx.model){
    model = ctx.model
  }

  if(!model){
    return {}
  }

  return {
    onChange: function(value){
      model[key] = value
    }.bind(ctx),
    value: model[key],
    help: model.__errors__ && model.__errors__[key]
  }
}