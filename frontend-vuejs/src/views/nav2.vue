<template>
  
	<div class="switch">
	    <input id="language-toggle" class="check-toggle check-toggle-round-flat" type="checkbox">
	    <label for="language-toggle"></label>
	    <span class="on">ENG</span>
	    <span class="off">THA</span>
  	</div>
 
</template>

<style>
.switch {
  position: relative;
  display: inline-block;
  margin: 0 5px;
}

.switch > span {
  position: absolute;
  top: 5px;
  pointer-events: none;
  font-weight: bold;
  font-size: 14px;
  width: 50%;
  text-align: center;
}

input.check-toggle-round-flat:checked ~ .off {
  color: #F36F25;
}
input.check-toggle-round-flat:checked ~ .on {
  color: #fff;
}

.switch > span.on {
  padding-left: 2px;
  color: #F36F25;
}
.switch > span.off {
  right: 0;
  padding-right:2px;
  color: #fff;
}

.check-toggle {
  position: absolute;
  visibility: hidden;
}
.check-toggle + label {
  display: block;
  position: relative;
  cursor: pointer;
}

input.check-toggle-round-flat + label {
  padding: 2px;
  width: 90px;
  height: 30px;
  background-color: #5598da;
  border-radius: 60px;
}
input.check-toggle-round-flat + label:before, 
input.check-toggle-round-flat + label:after {
  display: block;
  position: absolute;
  content: "";
}

input.check-toggle-round-flat + label:before {
  top: 2px;
  left: 2px;
  bottom: 2px;
  background-color: #F36F25;
}
input.check-toggle-round-flat + label:after {
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: 42px;
  background-color: #fff;
  border-radius: 52px;
  transition: 0.2s;
}

input.check-toggle-round-flat:checked + label:after {
  margin-left: 44px;
}
</style>