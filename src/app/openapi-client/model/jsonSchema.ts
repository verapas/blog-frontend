/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AbstractJsonSchemaPropertyObject } from './abstractJsonSchemaPropertyObject';
import { Item } from './item';


export interface JsonSchema { 
    title?: string;
    description?: string;
    properties?: { [key: string]: AbstractJsonSchemaPropertyObject; };
    requiredProperties?: Array<string>;
    definitions?: { [key: string]: Item; };
    type?: string;
    $schema?: string;
}

