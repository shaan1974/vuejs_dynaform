var Datepicker_template = function()
{
    /*
        <div class="form-group row form-group-date-picker" v-if="status_visibility" :class="styles.formGroup">
            
            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div class="calendar">
                        
                        <div class="form-group mb-0 form-control-sm pl-0">     
                            
                            <div class="input-group input-group-sm pl-0">

                                <!--<span class="icon-reset" v-if="status_ability" @click="emptyDate($event)"></span>-->
                                <input 
                                    autocomplete="off" 
                                    spellcheck="false"                             
                                    :name="name+'_'+fieldUid"
                                    :disabled="!status_ability" 
                                    mode="DATE" 
                                    type="text" 
                                    :value="vvalue" 
                                    @click="focus()" 
                                    @blur="blur()" 
                                    :placeholder="i_labels['PLACEHOLDER']" 
                                    v-expression.validation="i_validations" 
                                    v-expression.behaviour="i_behaviours"                     
                                    @input="updateElement($event,$event.target.value)" 
                                    class="form-control form-control-sm" 
                                    :class="[active ? 'no-bottom-radius' : '' , validation_error , requireClass() ? 'require' : '']">

                                <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>

                                <div class="input-group-append" @click="focus()">
                                    <div class="input-group-text calendar-icon" :class="active ? 'no-bottom-radius' : ''"></div>
                                </div>                             

                            </div>

                        </div>
                                            
                        <div class="calendar-layout" v-if="active" @mousedown.prevent>

                            <template v-if="board===1">
                            <div class="calendar-header">
                                
                                <div class="row">
                                    <div class="go-left" :class="hidePreviousMonth ? 'not' : ''" @click="hidePreviousMonth ? '' : setMonth('subtract')"></div>
                                    <div class="calendar-title" @click="changeBoard()">{{ monthYearFormatted }}</div>
                                    <div class="go-right" :class="hideNextMonth ? 'not' : ''" @click="hideNextMonth ? '' : setMonth('add')"></div>
                                </div>
                    
                                <div class="calendar-days">
                                    <div class="day" v-for="day in days" :key="day">{{ day }}</div>
                                </div>

                            </div>

                            <div class="calendar-body">

                                <div class="calendar-row" v-for="(row, index) in calendarDays" :key="index">
                                    
                                    <div class="calendar-day" 
                                        :class="{disabled: isDisabled(cell,(isBefore(cell)||isAfter(cell))), selected: isSelected(cell,(isBefore(cell)||isAfter(cell))), today: isToday(cell) , unselect : (isBefore(cell)||isAfter(cell)) }" 
                                        v-bind:style="{height: cellHeightUnit}" 
                                        v-for="(cell, index) in row" :key="index"
                                        @click="!(isBefore(cell)||isAfter(cell)) ? selectDay(cell) : ''">{{ cell.day }}</div>

                                </div>
                                
                            </div>

                            <div class="calendar-footer"></div>
                            </template>

                            <div class="months_layout" v-if="board===2">

                                <div class="row">
                                    <div class="go-left" @click="setYear('subtract')"></div>
                                    <div class="calendar-title" @click="changeBoard()">{{ monthYearFormatted }}</div>
                                    <div class="go-right" @click="setYear('add')"></div>
                                </div>

                                <table>
                                    <tr v-for="n in 3">
                                        <td :class="getCurrentMonth('s') == ((4*(n-1))+m)-1 ? 'current_month' : ''" v-for="m in 4" @click="changeMonth( ((4*(n-1))+m)-1 )">{{ monthName( ((4*(n-1))+m)-1 ) }}<div></div></td>
                                    </tr>
                                </table>
                            </div>

                            <div class="years_layout" v-if="board===3">

                                <div class="row">
                                    <div class="go-left" @click="setYear('subtract')"></div>
                                    <div class="calendar-title" @click="changeBoard()">{{ monthYearFormatted }}</div>
                                    <div class="go-right" @click="setYear('add')"></div>
                                </div>

                                <table>
                                    <tr v-for="n in 3">
                                        <td v-for="m in 5" :class=" ( ((5*(n-1))+m)-1 ) === 7 ? 'current_year' : '' ">
                                            
                                            <!-- BEFORE -->
                                            <template v-if="( ((5*(n-1))+m)-1 ) < 7 ">
                                            <span @click="defineYear( currentYear-(7-( ((5*(n-1))+m)-1 )) )">{{ currentYear-(7-( ((5*(n-1))+m)-1 )) }}</span>
                                            </template>

                                            <!-- AFTER -->
                                            <template v-if="( ((5*(n-1))+m)-1 ) > 7 ">
                                            <span @click="defineYear( currentYear+((7-( ((5*(n-1))+m)-1))*-1) )">{{ currentYear+((7-( ((5*(n-1))+m)-1))*-1) }}</span>
                                            </template>

                                            <!-- CURRENT -->
                                            <template v-if="( ((5*(n-1))+m)-1 ) === 7 ">
                                            <span>{{currentYear}}</span>
                                            </template>

                                        <div></div></td>
                                    </tr>
                                </table>                               

                            </div>
                        
                        </div>

                    </div>  
                    
                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>
                
                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                    </template>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                 

            </div>

        </div>
  	*/
}.toString();

// Datepicker_template = Datepicker_template.slice(13, -1).trim().slice(2, -2).trim();
Datepicker_template = Datepicker_template.prepareTemplate();