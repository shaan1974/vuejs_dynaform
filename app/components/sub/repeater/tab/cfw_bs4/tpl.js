var TabRepeater_template = function()
{
    /*
        <div class="form-group form-group-repeater-tab row" v-if="status_visibility" :class="styles.formGroup">
			
			<fieldset class="w-100" :disabled="!status_ability" :name="name+'_'+fieldUid">
			
				<label v-if="fieldMode === 'full'" class="col-form-label text-left" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

				<label v-if="fieldMode !== 'full' && builded_config.displayLabelAboveAnyway === true" class="col-form-label text-left col-sm-12" :class="[styles.label]">{{i_labels["LABEL"]}}</label>

				<div :class="[fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12']"  class="float-right">
					
					<div class="card text-center" :class="[validation_error , i_verticalTab ? 'v-tab' : 'h-tab']">
						
						<div class="card-header card-tab-header" :class=" i_verticalTab ? 'col-sm-1' : ''">
			
							<ul 
								class="nav nav-tabs card-header-tabs" 
								v-expression.validation="i_validations" 
								v-expression.behaviour="i_behaviours" 
								type="TABS">
								<li class="nav-item" v-for="(row, parent_index) in values" >
									<a class="nav-link" href="javascript:void(0)" :class="{ 'active': parent_index === vtab }" @click="vtab=parent_index">#{{parent_index | increment}}</a>
								</li>
								<template v-if="isNotDisplayMode()">
								<li class="table-repeater-add-btn" v-if="displayAddbtn()" :class="[values.length===0 ? 'btn-no-entries-yet' : '']">
									<button @click="addLine()" class="btn btn-repeater-add btn-success btn-sm"><span class="d-none d-lg-inline-block">{{i_labels["BTN_ADD"]}}</span></button>
								</li>	  					
								</template>
							</ul>

						</div>
						
						<template v-for="(row, parent_index) in values">
						<div class="card-body" :class="[ parent_index === vtab ? '' : 'd-none' , i_verticalTab ? 'col-sm-11' : '' ]">

								<template v-for="(rowValue, key, index) in row">

									<FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat" :name="name+'_'+parent_index+'_'+index+'_'+key" :parent_index="parent_index"></FormGenerator_Repeater>

								</template>
								
								<div class="cleafix"></div>
								<button v-if="isNotDisplayMode()" @click="removeLine(parent_index,'tab')" class="btn btn-repeater-remove btn-danger btn-sm float-right"><span class="d-none d-lg-inline-block">{{i_labels["BTN_REMOVE"]}}</span></button>

								<div class="clearfix"></div>

						</div>
						</template>
						
						<div class="col-sm-12 text-left text-no-entries" :class="values.length === 0 ? '' : 'd-none'">{{i_labels["NO_ENTRIES"]}}</div>										  
						
					</div>					

					<div class="clearfix"></div>

				</div>

				<div class="clearfix"></div>
				
				<template v-if="isNotDisplayMode()">
					
					<template v-if="isHelper()">
						<Helper_extra :helper="i_labels['HELPER']" :hclass="[ fieldMode === 'full' ? ''+css_config.helper+' float-left' : 'col-sm-12']"></Helper_extra>
					</template>

					<template v-if="isGuideLine()">
						<Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
					</template>				
				
				</template>

			</fieldset>

        </div>
    */
}.toString();

// TabRepeater_template = TabRepeater_template.slice(13, -1).trim().slice(2, -2).trim();
TabRepeater_template = TabRepeater_template.prepareTemplate();