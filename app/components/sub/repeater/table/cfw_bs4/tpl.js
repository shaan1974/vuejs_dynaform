var TableRepeater_template = function()
{
    /*
        <div class="form-group row form-group-table-repeater" v-if="status_visibility" :class="styles.formGroup">

			<button @click="set_OFF">DISABLED</button><button @click="set_ON">ENABLE</button> - status_ability : ({{status_ability}})
			
			<fieldset :disabled="!status_ability" :name="name+'_'+fieldUid">
		
				<label v-if="fieldMode === 'full'" class="col-form-label text-left float-left" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

				<label v-if="fieldMode !== 'full' && builded_config.displayLabelAboveAnyway === true" class="col-form-label text-left col-sm-12" :class="[styles.label]">{{i_labels["LABEL"]}}</label>
							
				<div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" class="float-right">

					<template v-if="builded_config.verticalDisplay===false">
						
						<table 
							border="1" 
							class="table table-bordered position-relative" 							 
							:class="[ builded_config.responsive === true ? 'rstable' : 'nstable' , validation_error ]" 
							v-expression.validation="i_validations" 
							v-expression.behaviour="i_behaviours" 
							type="TABLE">
									
							<thead :class2="(values.length === 0  && this.builded_config.dynamic === undefined ) ? 'd-none' : ''">

								<tr>
									<th scope="col" class="colCounter" v-if="builded_config.displayLineCounter" :class="builded_config.responsive===false ? 'w-1':''"></th>
									<th scope="col" 
										v-for="(colName,index) in i_labels['COLUMNS']" 
										v-if="fieldsFormat[index].fieldType!='nos'" 
										:class="styles['tableHeader'][index]" 
										class="position-relative" 
										:name="name+'_'+fieldUid+'_col'+index">
											{{colName}}
											<Guideline_extra :guideline="i_labels['GUIDELINES'][index]" :reff="name+'_'+fieldUid+'_col'+index" :col="index"></Guideline_extra>
											
										<!-- SORT ICON -->
										<template v-if="builded_config.dynamic">
										
											<div class="sort_icon" :class="builded_config.dynamic.order.css[index]" @click="changeOrder($event,index)"></div>

										</template>
										<!-- /SORT ICON -->

										</th>
									<th scope="col" :class="builded_config.responsive===false ? 'w-1':''" v-if="isNotDisplayMode()"></th>
								</tr>

								<!-- HEADER FILTERING -->
								<template v-if="this.builded_config.dynamic != undefined">
								<template v-if="this.builded_config.dynamic.headerFiltering != undefined">
								<tr :class="this.builded_config.dynamic.headerFiltering.visible === true ? '' : 'd-none'">
									<th scope="col" class="colCounter" v-if="builded_config.displayLineCounter" :class="builded_config.responsive===false ? 'w-1':''"></th>

									<th scope="col" 
										v-for="(colName,index) in i_labels['COLUMNS']" 
										v-if="fieldsFormat[index].fieldType!='nos'" 
										:class="styles['tableHeader'][index]" 
										class="position-relative" 
										:name="name+'_'+fieldUid+'_col'+index">

										<template v-if="builded_config.dynamic.headerFiltering.actif[index]===true">
																				
											<template v-if="builded_config.dynamic.headerFiltering.type[index]==='text'">

												<input 
													type="text" 
													@input="filterChange()" 
													v-model="builded_config.dynamic.headerFiltering.values[index]" 
													autocomplete="off" spellcheck="false" :name="'filter_column_'+index" placeholder="..."  
													:class="[ builded_config.dynamic.headerFiltering.values[index] === '' ? 'empty' : 'not-empty' , builded_config.dynamic.headerFiltering.values[index].length>=builded_config.dynamic.headerFiltering.minChars[index] ? 'dynamicFilterActif' : '']" 
													class="form-control form-control-sm">

												<div class="clear" :class="[builded_config.dynamic.headerFiltering.values[index] !== '' ? 'm-fadeIn' : 'm-fadeOut']" @click="_resetFilter($event,index,'input')"></div>

											</template>

											<template v-else-if="builded_config.dynamic.headerFiltering.type[index]==='number'">
												
												<input 
													type="number" 
													@input="filterChange()" 
													v-model="builded_config.dynamic.headerFiltering.values[index]" 
													autocomplete="off" spellcheck="false" :name="'filter_column_'+index" placeholder="..." 
													class="form-control form-control-sm"
													:class="[ builded_config.dynamic.headerFiltering.values[index].length>=builded_config.dynamic.headerFiltering.minChars[index] ? 'dynamicFilterActif' : '']" >

											</template>

											<template v-if="builded_config.dynamic.headerFiltering.type[index]==='dropdown'">
											
												<div class="select-warper position-relative select-warper-dynamic">   
													
													<select class="form-control form-control-sm" v-model="builded_config.dynamic.headerFiltering.values[index]"  :name="'filter_column_'+index" @change="filterChange()">
														<option v-for="(o,i) in _getDico( builded_config.dynamic.headerFiltering.dico[index] )" :value="o">{{o}}</option> 													
													</select>

												</div>

											</template>

										</template>

									</th>
									<th scope="col" :class="builded_config.responsive===false ? 'w-1':''" v-if="isNotDisplayMode()"></th>
								</tr>
								</template>
								</template>
								<!-- /HEADER FILTERING -->
							
							</thead>
							
							<tbody>
								
								<div class="noDynamicTableLoader" v-if="!tableDynaLoader">
								</div>

								<div class="dynamicTableLoader" v-if="tableDynaLoader">
									<div class="loader"><div class="spinner"></div></div>
								</div>
								<tr v-for="(row, parent_index) in values">
									
									<td class="colCounter" v-if="builded_config.displayLineCounter"><span>#{{parent_index | increment}}</span></td>

									<td :data-label="i_labels['COLUMNS'][index]" v-for="(rowValue, key, index) in row" v-if="fieldsFormat[index].fieldType!='nos'">
																			
										<template v-if="_foundHighlightTag(rowValue)">
											<div class="form-group row form-group-input-text">
												<div class="col-sm-12 highlight">
													<div class="card col-sm-12 display-mode-input"><div class="card-body pl-0 pr-0" v-html="_highLight(rowValue)"></div></div>
												</div>
											</div>
										</template>

										<template v-else>

											<FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat" :name="name+'_'+parent_index+'_'+index+'_'+key" :parent_index="parent_index"></FormGenerator_Repeater>

										</template>
										
									</td>

									<td v-if="isNotDisplayMode()">
										<button @click="removeLine(parent_index,'table')" class="btn btn-repeater-remove btn-danger btn-sm ">
											<span class="d-none d-lg-inline-block">{{i_labels["BTN_REMOVE"]}}</span>
										</button>
									</td>

								</tr>

							</tbody>	
							
							<template v-if="isNotDisplayMode()">
							<tfoot v-if="displayAddbtn()">
								<tr :class="values.length === 0 ? '' : 'd-none'">
									<td class="noe">{{i_labels["NO_ENTRIES"]}} <button @click="addLine()" class="btn btn-repeater-add btn-success btn-sm float-right cp5px">{{i_labels["BTN_ADD"]}}</button></td>
								</tr>
								<tr :class="values.length !== 0 ? '' : 'd-none'">
									<td v-if="builded_config.displayLineCounter" class="fc colCounter"></td>
									<td :colspan="colspanFooter">
										<button @click="addLine()" class="btn btn-repeater-add btn-success btn-sm float-right"><span class="d-none d-lg-inline-block">{{i_labels["BTN_ADD"]}}</span></button>
									</td>
								</tr>
							</tfoot>
							</template>							
							
						</table>

						<!-- DYNAMIC : START -->
						<div class="card dynamic-card" v-if="this.builded_config.dynamic != undefined">
							  
							<div class="card-body">
								
								<debug_extra :dvar="this.builded_config.dynamic"></debug_extra>

								<div v-if="this.builded_config.dynamic.array_pager" class="entries" :class="this.builded_config.dynamic.array_pager.totalItems===0 ? 'd-none' : ''">									
									{{getLabel($root, "DT_FROM")}}: {{this.builded_config.dynamic.array_pager.startIndex+1}} {{getLabel($root, "DT_TO")}} {{this.builded_config.dynamic.array_pager.endIndex+1}}
									&#160;
									<template v-if="this.builded_config.dynamic.array_pager.totalItems===this.builded_config.dynamic.grand_total">
									- {{getLabel($root, "DT_TOTAL")}}: [{{this.builded_config.dynamic.array_pager.totalItems}}]
									</template>
									<template v-else>
									- {{getLabel($root, "DT_FILTER")}}: [{{this.builded_config.dynamic.array_pager.totalItems}}] - {{getLabel($root, "DT_TOTAL")}}: [{{this.builded_config.dynamic.grand_total}}]
									</template>
								</div>

								<nav aria-label="Page navigation example" class="float-left">
									<ul class="pagination" v-if="builded_config.dynamic.array_pager">
										
										<!-- FIRST -->
										<template v-if="!(indexOfPage('first') && this.builded_config.dynamic.hideNavButtonIfDisabled )">
											<li class="page-item" :class="indexOfPage('first') ? 'disabled' : ''">
												<a class="page-link firstEntry" @click="loadExternalData(1);">
												<template v-if="this.builded_config.dynamic.pagingLabel===true"> {{getLabel($root, "DT_FIRST")}}</template>
												</a>
											</li>
										</template>

										<!-- PREV -->
										<template v-if="!( builded_config.dynamic.page===1 && this.builded_config.dynamic.hideNavButtonIfDisabled)">
											<li class="page-item" :class="builded_config.dynamic.page===1 ? 'disabled' : ''">
												<a class="page-link prevEntry" @click="loadExternalData( builded_config.dynamic.page-1);">
												<template v-if="this.builded_config.dynamic.pagingLabel===true"> {{getLabel($root, "DT_PREVIOUS")}}</template>
												</a>
											</li>
										</template>
										
										<!-- LOOP -->
										<li class="page-item" v-for="(v,index) in builded_config.dynamic.array_pager.pages" :class="v===builded_config.dynamic.page ? 'active' : ''">
											<a class="page-link" @click="loadExternalData(v);">{{v}}</a>
										</li>

										<!-- NEXT -->
										<template v-if="!( builded_config.dynamic.page===builded_config.dynamic.array_pager.totalPages && this.builded_config.dynamic.hideNavButtonIfDisabled)">
											<li class="page-item" :class="builded_config.dynamic.page===builded_config.dynamic.array_pager.totalPages ? 'disabled' : ''">
												<a class="page-link nextEntry" @click="loadExternalData( builded_config.dynamic.page+1);">
												<template v-if="this.builded_config.dynamic.pagingLabel===true">{{getLabel($root, "DT_NEXT")}} </template>
												</a>
											</li>
										</template>

										<!-- LAST -->
										<template v-if="!(indexOfPage('last') && this.builded_config.dynamic.hideNavButtonIfDisabled )">
											<li class="page-item" :class="indexOfPage('last') ? 'disabled' : ''">
												<a class="page-link lastEntry" @click="loadExternalData(builded_config.dynamic.array_pager.totalPages);">
												<template v-if="this.builded_config.dynamic.pagingLabel===true">{{getLabel($root, "DT_LAST")}} </template>
												</a>
											</li>
										</template>

									</ul>
								</nav>

								<div class="card-select">	
									<div class="select-warper">
										<select class="form-control form-control-sm" :id="name+'_'+fieldUid+'_pager'" @change="changePerPage($event)">
											<option v-for="(v,index) in builded_config.dynamic.pager" :select="v===builded_config.dynamic.per_page">{{v}}</option>
										</select/>
									</div>
								</div>

								<template v-if="builded_config.verticalDisplay===false">
								<template v-if="this.builded_config.dynamic != undefined">
								<template v-if="this.builded_config.dynamic.array_pager">

									<div class="alert alert-primary mb-0" role="alert" :class="this.builded_config.dynamic.array_pager.totalItems===0 ? '' : 'd-none'">
										{{getLabel($root, "DT_SEARCH_EMPTY")}}
									</div>					

								</template>
								</template>
								</template>								

							  </div>
							  
						</div>					
						<!-- /DYNAMIC : START -->	

						<div class="clearfix"></div>
																	
					</template>

					<template v-if="builded_config.verticalDisplay===true">

						<table class="table" v-expression.validation="i_validations" :name="name+'_'+fieldUid" > 

							<tbody>

								<tr v-for="(row, parent_index) in values">

									<td  data-label="#" v-if="builded_config.displayLineCounter" class="v-table-num">
										<h6><span class="badge badge-primary font-weight-lighter"># {{parent_index | increment}}</span></h6>
									</td>

									<table class="table v-table">

										<tr v-for="(rowValue, key, index) in row" v-if="fieldsFormat[index].fieldType!='nos'">

											<td>{{i_labels['COLUMNS'][index]}}<td>
											<FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat" :name="name+'_'+parent_index+'_'+index+'_'+key" :parent_index="parent_index"></FormGenerator_Repeater>
											</td>
											
										</tr>

									</table>

									<td class="v-table-num">
										<button  v-if="isNotDisplayMode()" @click="removeLine(parent_index,'table')" class="btn btn-repeater-remove btn-danger btn-sm"><span class="d-none d-lg-inline-block">{{i_labels["BTN_REMOVE"]}}</span></button>
									</td>

								</tr>

								<template v-if="isNotDisplayMode()">
								<tr :class="values.length === 0 ? 'd-none' : ''">
									<td class="v-table-bottom" :colspan="builded_config.displayLineCounter === true ? '3' : '2'">
										<button @click="addLine()" class="btn btn-repeater-add btn-success btn-sm float-right"><span class="d-none d-lg-inline-block">{{i_labels["BTN_ADD"]}}</span></button>
									</td>
								</tr>
								</template>

							</tbody>

							<template v-if="isNotDisplayMode()">
							<tfoot>
								<tr :class="values.length === 0 ? '' : 'd-none'">
									<td class="noe">{{i_labels["NO_ENTRIES"]}} <button @click="addLine()" class="btn btn-repeater-add btn-success btn-sm float-right cp5px"><span class="d-none d-lg-inline-block">{{i_labels["BTN_ADD"]}}</span></button></td>
								</tr>
							</tfoot>		
							</template>					
							
						</table>

						<div class="clearfix"></div>

					</template>

				</div>
				
				<template v-if="isNotDisplayMode()">

					<div class="clearfix"></div>

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

// TableRepeater_template = TableRepeater_template.slice(13, -1).trim().slice(2, -2).trim();
TableRepeater_template = TableRepeater_template.prepareTemplate();