function FieldTemplate(options){
    options = options || {};

    this.label = options.label;
    this.value = options.value || options.selected;
    this.placeholder = options.placeholder;
    this._validators = [];
    this.disabled = options.disabled || false;
    this.field = null;
}

FieldTemplate.prototype.addValidator = function(fn){
    this._validators.push(fn);
    return this;
};

FieldTemplate.prototype.isValid = function(){
    for(var n = 0; n < this._validators.length; n++){
        if(!this._validators[n].call(this, this.val())){
            return false;
        }
    }

    return true;
};

FieldTemplate.prototype.change = function(fn){
    var that = this;

    $(this.field).change(function(){
        fn.call(that, ($(this).val()));
    });

    return this;
};

FieldTemplate.prototype.val = function(v){
    if(v !== undefined){
        this.value = v;
        $(this.field).val(v);
        return this;
    }
    else{
        return this.value;
    }
};

FieldTemplate.prototype.render = function(){
    return $('<div>').addClass('input-group').append(
        $('<label>').text(this.label)
    );
};

function TextField(options){
    FieldTemplate.call(this, options);
    this.field = $('<input>');
}

TextField.prototype = new FieldTemplate();

TextField.prototype.render = function(){
    var that = this;

    this.field.attr({
        type: 'text',
        disabled: this.disabled,
        placeholder: this.placeholder,
        value: this.value
    }).change(function(){
        that.value = $(this).val();
    });

    return FieldTemplate.prototype.render.call(this)
        .append(this.field)
        .wrap('<div class="input-wrapper"></div>').parent();
};

function SelectField(options){
    FieldTemplate.call(this, options);
    this.field = $('<select>');
    this.options = options.options || [];
}

SelectField.prototype = new FieldTemplate();

SelectField.prototype.render = function(){
    var that = this;

    this.field.attr({
        disabled: this.disabled
    }).change(function(){
        that.value = $(this).val();
    });

    this.options.forEach(function(v){
        that.field.append(
            $('<option>').val(v[0]).text(v[1])
        );
    });

    this.field.val(this.value);

    return FieldTemplate.prototype.render.call(this)
        .append(this.field)
        .wrap('<div class="input-wrapper"></div>').parent();
};

function NumberField(options){
    FieldTemplate.call(this, options);
    this.field = $('<input>');

    this.min = options.min || 0;
    this.max = options.max || 1;
    this.placeholder = options.placeholder || this.min;

    this.addValidator(function(val){
        return this.min <= val && val <= this.max;
    });

    this.change(function(v){
        if(v > this.max) this.val(this.max);
        else if(v < this.min) this.val(this.min);
    });
}

NumberField.prototype = new FieldTemplate();

NumberField.prototype.render = function(){
    var that = this;

    this.field.attr({
        type: 'number',
        min: this.min,
        max: this.max,
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled
    }).change(function(){
        that.value = $(this).val();
    });

    return FieldTemplate.prototype.render.call(this)
        .append(this.field)
        .wrap('<div class="input-wrapper"></div>').parent();
};

function CheckField(options){
    FieldTemplate.call(this, options);
    this.field = $('<input>');
    this.checked = options.checked || false;
}

CheckField.prototype = new FieldTemplate();

CheckField.prototype.render = function(){
    var that = this;

    this.field.attr({
        type: 'checkbox',
        checked: this.checked,
        disabled: this.disabled
    }).change(function(){
        that.checked = this.checked;
    });

    return FieldTemplate.prototype.render.call(this).append(
        $('<div>').addClass('check-group').append(this.field)
    ).wrap('<div class="input-wrapper"></div>').parent();
};

function Field(options){
    if(!options) options = {};

    var factory = {
        type: 'text'
    };

    Object.getOwnPropertyNames(factory).forEach(function(ele){
        if(!options.hasOwnProperty(ele)){
            options[ele] = factory[ele];
        }
    });

    if(options.type == 'text'){
        return new TextField(options);
    }
    else if(options.type == 'select'){
        return new SelectField(options);
    }
    else if(options.type == 'number'){
        return new NumberField(options);
    }
    else if(options.type == 'check'){
        return new CheckField(options);
    }
    else{
        return null;
    }
}
