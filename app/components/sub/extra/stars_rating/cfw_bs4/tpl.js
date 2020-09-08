var StarRating_template = function()
{
    /*
        <div class="form-group row form-group-star-rating" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <input 
                        type="hidden" 
                        class="form-control" 
                        :class="[validation_error , requireClass() ? 'require' : '']" 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours">

                    <div class="full-stars" v-if="builded_config.mode==='FULL'">

                        <div class="rating-group" :class="[validation_error, requireClass() ? 'require' : '']" :name="name+'_'+fieldUid">

                            <input @click="starUpdate(0)" :checked="value===0" class="rating__input rating__input--none" :name="name+'_rating'" :id="name+'_rating-0'" value="0" type="radio" v-show="builded_config.ratingNone">
                            <label v-show="builded_config.ratingNone" aria-label="No rating" class="rating__label" :for="name+'_rating-0'"><i class="rating__icon rating__icon--none icon-ban"></i></label>
                            
                            <template v-for="(n, index) in config.max">

                                <label @click="starUpdate(n)" class="rating__label" :for="name+'_rating-'+n"><i class="rating__icon rating__icon--star icon-star"></i></label>
                                <input :checked="n===value" class="rating__input" :name="name+'_rating'" :id="name+'_rating-'+n" :value="n" type="radio">
                            
                            </template>

                        </div>
                        <span class="badge badge-secondary" v-if="builded_config.show_value">{{value}}/{{config.max}}</span>

                    </div>

                    <div class="half-stars" v-if="builded_config.mode==='HALF'">

                        <div class="rating-group" :class="[validation_error, requireClass() ? 'require' : '']" :name="name+'_'+fieldUid">

                            <input @click="starUpdate(0)" :checked="value===0" class="rating__input rating__input--none" :name="name+'_rating'" :id="name+'_rating-0'" value="0" type="radio" v-show="builded_config.ratingNone">
                            <label v-show="builded_config.ratingNone" aria-label="No rating" class="rating__label" :for="name+'_rating-0'"><i class="rating__icon rating__icon--none icon-ban"></i></label>

                            <template v-for="(n, index) in config.max">
                                
                                    <label aria-label="0.5 stars" class="rating__label rating__label--half" :for="name+'_rating-'+(n-0.5)"><i class="rating__icon rating__icon--star icon-star-half"></i></label>
                                    <input @click="starUpdate(n-0.5)" :checked="n-0.5===value" class="rating__input" :name="name+'_rating'" :id="name+'_rating-'+(n-0.5)" :value="n-0.5" type="radio">
                                    <label aria-label="1 star" class="rating__label":for="name+'_rating-'+n"><i class="rating__icon rating__icon--star icon-star"></i></label>
                                    <input @click="starUpdate(n)" :checked="n===value" class="rating__input" :name="name+'_rating'" :id="name+'_rating-'+n" :value="n" type="radio">

                            </template>                        

                        </div>  
                        <span class="badge badge-secondary" v-if="builded_config.show_value">{{value}}/{{config.max}}</span>

                    </div>

                    <div class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>                    

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}/{{config.max}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>                        
                    </div> 

                </template>                   
                
            </div>
            
            <template v-if="isNotDisplayMode()">

                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>

            </template>

        </div>
  	*/
}.toString();

// StarRating_template = StarRating_template.slice(13, -1).trim().slice(2, -2).trim();
StarRating_template = StarRating_template.prepareTemplate();