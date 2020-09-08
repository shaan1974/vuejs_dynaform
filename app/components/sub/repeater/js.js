//	FORM GENERATOR

var FormGenerator_Repeater_template = function()
{
    /*
		<div>

			<template v-if="isInlist(fieldsFormat[index].fieldType, $root.config.group.repeater[0] )">

				<component :key="index"  
							:key2="key3"  
							:is="fieldsFormat[index].fieldType"  
							:value="rowValue"  
							:name="name"  
							:nameX="fieldsFormat[index].name"  
							:parent_index="parent_index"  
							v-bind="fieldsFormat[index]">
				</component>	

			</template>
			
			<template v-else-if="fieldsFormat[index].fieldType===$root.config.group.repeater[1][0]">
										
					<component :key="index"  
						:key2="key3"  
						:is="fieldsFormat[index].fieldType"  
						:value="rowValue"  
						:name="name"  
						:parent_index="parent_index"   
						v-bind="fieldsFormat[index]">
					</component>

			</template>
			
			<template v-else-if="isInlist(fieldsFormat[index].fieldType,$root.config.group.repeater[2])">
	
				<component :key="index"  
							:key2="key3"  
							:is="fieldsFormat[index].fieldType"  
							:namex="name"  
							:name="key3"  
							:parent_index="parent_index"  
							:columns="fieldsFormat[index].columns"  
							:values="rowValue"  
							v-bind="fieldsFormat[index]">
				</component>	

			</template>

			<template v-else-if="fieldsFormat[index].fieldType===$root.config.group.repeater[3][0]">
				
				<component  :key="index"  
							:key2="key3"  
							:is="fieldsFormat[index].fieldType"  			               
							:tabs="fieldsFormat[index].tabs"  
							:name="key3"  
							:parent_index="parent_index"  
							:values="rowValue"  
							v-bind="fieldsFormat[index]">
				</component>					
				
			</template>	

			<template v-else-if="fieldsFormat[index].fieldType===$root.config.group.repeater[4][0]">
				
				<component  :key="index"  
							:key2="key3"  
							:is="fieldsFormat[index].fieldType"  
							:name="name"  
							:parent_index="parent_index"  
							:values="rowValue"  
							v-bind="fieldsFormat[index]">
				</component>	

			</template>		
			
			<template v-else-if="fieldsFormat[index].fieldType===$root.config.group.repeater[5][0]">
			</template>		
			
		</div>
   	*/
}.toString();

var FormGenerator_Repeater_template = function()
{
    /*
		<component :key="index"  
					:key2="key3"  
					:is="fieldsFormat[index].fieldType"  
					:value="rowValue"  
					:name="(isInlist(fieldsFormat[index].fieldType,$root.config.group.repeater[2]) || fieldsFormat[index].fieldType===$root.config.group.repeater[3][0]) ? key3 : name"  
					:parent_index="parent_index"  
					:values="rowValue" 
					:columns="fieldsFormat[index].columns"  
					:tabs="fieldsFormat[index].tabs"  
					v-bind="fieldsFormat[index]" v-if="fieldsFormat[index].fieldType!==$root.config.group.repeater[5][0]">
		</component>	
    */
}.toString();


FormGenerator_Repeater_template = FormGenerator_Repeater_template.prepareTemplate();

FormGenerator_Repeater = Vue.component(
    'FormGenerator_Repeater',
    {
        template: FormGenerator_Repeater_template,
        props: ["rowValue", "key3", "index", "fieldsFormat", "name", "parent_index", "Ichecked", "tabs"],
        methods:
        {
            isInlist: function(e, l)
            {
                return (l.indexOf(e) !== -1) ? true : false;
            }
        }
    }
);