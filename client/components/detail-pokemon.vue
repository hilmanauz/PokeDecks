<template>
  <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-human-male-height</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Height: {{pokemon.height}} Dm</v-list-item-title>
        </v-list-item>
       <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-weight</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Weight: {{pokemon.weight}} Hg</v-list-item-title>
        </v-list-item>

       <v-list-item>
         <v-list-item-icon>
            <v-icon>mdi-circle-expand</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Base Experience: {{pokemon['base_experience']}}</v-list-item-title>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-ev-plug-type1"
        >
          <template v-slot:activator>
            <v-list-item-title>Type</v-list-item-title>
          </template>
          <v-list-item
            v-for="(type, idx) in types"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title v-text="type" class="text-capitalize"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         </v-list-group>
        <v-list-group
          prepend-icon="mdi-state-machine"
        >
          <template v-slot:activator>
            <v-list-item-title>Status</v-list-item-title>
          </template>
          <v-list-group
            sub-group
            v-for="([titleStat, pointStat], idx) in stats"
            :key= "idx"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="text-capitalize">{{titleStat.split('-').join(" ")}}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item>
              <v-list-item-title v-text="pointStat"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>  
        <v-list-group
          prepend-icon="mdi-car-esp"
        >
          <template v-slot:activator>
            <v-list-item-title>Passive Ability</v-list-item-title>
          </template>
          <v-list-item
            v-for="(ability, idx) in abilities"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title v-text="ability" class="text-capitalize" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         </v-list-group>
        <v-list-group
          prepend-icon="mdi-fencing"
        >
          <template v-slot:activator>
            <v-list-item-title>Active Skill</v-list-item-title>
          </template>
          <v-list-item
            v-for="(move, idx) in moves"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title v-text="move" class="text-capitalize" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         </v-list-group>
      </v-list>
</template>
<script>
export default {
  props: ['abilities', 'stats', 'types', 'moves', 'pokemon']
}
</script>