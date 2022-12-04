<template>
  <div>
      <div className = "mainBanner">
        <span className = "descr"> 
        Надо что-то написать 
        <button className = "bannerBtn">Нажми меня</button>
        </span>
      </div>
      <div className = "cardContainer">
        <div class="cardEvent">
            <div className = "imgEvent">
              <div></div>
              <p>Региональный чемпионат WorldSkills “Инженерный дизайн CAD”</p>  
              <img src="../assets/icon/event1.png">
            </div>
            <div class="wrapperContent">
              <div>
                <p >
                  Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                </p>
                <p className = "date">01.04.2021</p>
              </div>
            </div>
          </div>
          <div class="cardEvent">
            <div className = "imgEvent">
              <div></div>
              <p>Викторина “Роль и место прокуратуры России в Российской Федерации”</p>  
              <img src="../assets/icon/event3.png">
            </div>
            <div class="wrapperContent">
              <div>
                <p>
                  Викторина для школьников “Роль и место прокуратуры России в Российской Федерации”
                </p>
                <p className = "date">05.04.2021</p>
              </div>
            </div>
          </div>
          <div class="cardEvent">
            <div className = "imgEvent">
              <div></div>
              <p>Конкурс “Защити свою профессию” по профилю “Электрические станции”</p>  
              <img src="../assets/icon/event2.png">
            </div>
            <div class="wrapperContent">
              <div>
                <p>
                  В конкурсе принимают участие студенты 4 курса профиля “Электрические станции”. Цель конкурса: выявить лучших студентов по уровню освоения профессиональных компетенций и способностей к творческому мышлению
                </p>
                <p className = "date">06.04.2021</p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
  @import '@/assets/news.scss';
</style>