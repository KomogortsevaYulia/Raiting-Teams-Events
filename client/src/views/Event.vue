<template>
    <div>
        <div class = "eventContainer">
            <div class="eventInfo">
                <h1>Региональный чемпионат WorldSkills “Инженерный дизайн CAD dddddd”</h1>  
                <div class = "imgEvent">
                    <div></div>
                   
                    <img src="../assets/icon/event1.png">
                </div>
                <div class="wrapperContent">
                    <div class = "teg__container">
                        <div class = "teg">
                        Offline
                        </div>
                        <div class = "teg">
                        Межвузовский
                        </div>
                    </div>
                    <div>
                        <p >
                        Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                        </p>
                        <p >
                        Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                        </p>
                        <p >
                        Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                        </p>
                        <p >
                        Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                        </p>

            
                    </div>
                   <div class = "down">
                    <button type="button" class="button">Зарегистрироваться</button>

                    <p class = "date">01.04.2021</p>
                   </div>
   
                </div>
            </div>
        </div>
        Абалдеть
    </div>
</template>

<style lang="scss">

@import '@/assets/globals.scss';

.eventInfo{
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
      width: 69rem;
      height: auto;
   
      border-radius: 1rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      transition: all .5s;
  }

  .down{
  
    display:flex;
    justify-content: space-between;

    .date{
          text-align: end;
          font-size: 1.6rem;
          font-weight: 100;
          margin: 0;
      }

    .button {
 
            background-color: var(--main-color);
            border: none;
            color: black;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;

            &:hover {
                background:  var(--main-color-hover);
                transition: 0.3s;
            }
        }
   
  }





  .imgEvent{
      position: relative;
      overflow: hidden;

 

      img{
          display: block;
          margin-left: auto;
          margin-right: auto ;
          width: 1050px;
          height: 450px;
          
      }

  }

  .eventContainer{
    
      
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      
      h1{
          font-size: 1.8em;
          margin-top: 1rem;
          margin-bottom: 1rem;
          margin-inline-start: 1.72rem;
          margin-inline-end: 1.71rem;

        }
  }

  .wrapperContent{
    font-size: 1.17rem;
     margin-top: 1rem;
     margin-bottom: 1rem;
     margin-inline-start: 1.72rem;
     margin-inline-end: 1.71rem;
   

  }

  .teg__container{
    font-size: 1rem;
      justify-content: space-between;

      .teg{
          display: inline-block;
          background-color: #9DD9D2;
          padding: 0.6rem;
          border-radius: 1rem;
          margin: 0 0.6rem 0 0;
      }
  }

 

</style>