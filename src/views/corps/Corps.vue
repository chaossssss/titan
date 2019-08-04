<template>
  <div class="container">
    <CorpsList/>
    <router-view/>
  </div>
</template>
<script type="text/javascript">
import CorpsList from './CorpsList'
export default{
	name: 'corps',
	data(){
		return{

		}
	},
	components: {
		CorpsList,
	}
}
</script>