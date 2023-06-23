<template>
  <div>
    <label class="like-switch-label">
      <input type="checkbox" class="like-switch" checked />
      <div class="switch-cover">
        <span class="switch-lang switch-lang--ru">ru</span>
        <span class="switch-lang switch-lang--ua">ua</span>
        <div class="switch-circle"></div>
      </div>
    </label>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  background-color: #f6f6f6;
}

* {
  box-sizing: border-box;
}

.wrapper {
  max-width: 500px;
  margin: 30px auto;
  text-align: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: 5.7px 8.2px 18px rgba(0, 0, 0, 0.15);
  padding: 45px 80px;
}

.like-switch-label__text {
  display: block;
  margin-right: 20px;
  font-size: 22px;
}

.like-switch-label {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.like-switch {
  position: absolute;
  opacity: 0;
  /*    
	&:checked + .switch-cover > .switch-circle{
        transform: translate3d(34px, 0, 0);
    }
		
	&:checked + .switch-cover > .switch-lang--ru{
        opacity: 0
    }
		
	&:checked + .switch-cover > .switch-lang--ua{
        opacity: 1
    } */
}

.switch-cover {
  width: 68px;
  height: 34px;
  cursor: pointer;
  border-radius: 17px;
  background-color: transparent;
  transition: background-color 0.4s;
  padding: 6px;
  border: 2px solid #dfdfe2;
  position: relative;
}

.switch-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #dfdfe2;
  transition: transform 0.4s ease;
  pointer-events: none;
  position: relative;
  z-index: 2;
}

.switch-lang {
  position: absolute;
  top: 6px;
  color: #a70c5d;
  transition: opacity 0.2s;
}

.switch-lang--ru {
  right: 6px;
}

.switch-lang--ua {
  left: 6px;
  opacity: 0;
}
</style>
