"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeMap_1 = require("./TypeMap");
var default_1 = /** @class */ (function () {
    /**
     * A representation of a database column.
     *
     * @param name     The name of this table.
     * @param nullable Whether this column is nullable.
     * @param type     The type of this column, as retrieved from the database schema.
     * @param table    The Table that this column belongs to.
     */
    function default_1(name, nullable, type, table, config) {
        var _this = this;
        this.name = name;
        this.nullable = nullable;
        this.type = type;
        var overrides = config.typeOverrides || {};
        var fullName = table.name + "." + this.name;
        var convertedType = undefined;
        if (overrides[fullName] != null) {
            convertedType = overrides[fullName];
        }
        else {
            convertedType = Object.keys(TypeMap_1.default).find(function (t) { return TypeMap_1.default[t].includes(_this.type); });
        }
        this.jsType = convertedType === undefined ? 'any' : convertedType;
    }
    /**
     * This Column as a TypeScript type definition.
     *
     * @returns {string}
     */
    default_1.prototype.stringify = function () {
        return this.name + "?: " + this.jsType + (this.nullable ? ' | null' : '');
    };
    /**
     * This Column as a plain JavaScript object.
     *
     * @returns
     */
    default_1.prototype.toObject = function () {
        return {
            name: this.name,
            type: this.type,
            jsType: this.jsType,
            nullable: this.nullable
        };
    };
    return default_1;
}());
exports.default = default_1;
