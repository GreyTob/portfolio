/**
 * Full page
 */
;(function () {
  'use strict'

  /**
   * Full scroll main function
   */
  const fullScroll = function (params) {
    /**
     * Main div
     * @type {Object}
     */
    const main = document.getElementById(params.mainElement)

    /**
     * Sections divclass
     * @type {Array}
     */
    const sections = main.getElementsByTagName('section')

    /**
     * Full page scroll configurations
     * @type {Object}
     */
    const defaults = {
      container: main,
      sections: sections,
      animateTime: params.animateTime || 0.7,
      animateFunction: params.animateFunction || 'ease',
      maxPosition: sections.length - 1,
      currentPosition: 0,
      displayDots:
        typeof params.displayDots != 'undefined' ? params.displayDots : true,
      dotsPosition: params.dotsPosition || 'left',
    }

    this.defaults = defaults
    /**
     * Init build
     */
    this.init()
  }

  /**
   * Init plugin
   */
  fullScroll.prototype.init = function () {
    this.buildPublicFunctions().buildSections().buildDots().addEvents()

    const anchor = location.hash.replace('#', '').split('/')[0]
    location.hash = 0
    this.changeCurrentPosition(anchor)
    this.registerIeTags()
  }

  /**
   * Build sections
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.buildSections = function () {
    const sections = this.defaults.sections
    for (let i = 0; i < sections.length; i++) {
      sections[i].setAttribute('data-index', i)
    }
    return this
  }

  /**
   * Build dots navigation
   * @return {Object} this (fullScroll)
   */
  fullScroll.prototype.buildDots = function () {
    this.ul = document.createElement('ul')

    this.ul.className = this.updateClass(1, 'dots', this.ul.className)
    this.ul.className = this.updateClass(
      1,
      this.defaults.dotsPosition == 'right' ? 'dots-right' : 'dots-left',
      this.ul.className
    )

    const _self = this
    const sections = this.defaults.sections

    for (let i = 0; i < sections.length; i++) {
      const li = document.createElement('li')
      const a = document.createElement('a')

      a.setAttribute('href', '#' + i)
      li.appendChild(a)
      _self.ul.appendChild(li)
    }

    this.ul.childNodes[0].firstChild.className = this.updateClass(
      1,
      'active',
      this.ul.childNodes[0].firstChild.className
    )

    if (this.defaults.displayDots) {
      document.body.appendChild(this.ul)
    }

    return this
  }

  /**
   * Add Events
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.addEvents = function () {
    if (document.addEventListener) {
      document.addEventListener('mousewheel', this.mouseWheelAndKey, false)
      document.addEventListener('wheel', this.mouseWheelAndKey, false)
      document.addEventListener('keyup', this.mouseWheelAndKey, false)
      document.addEventListener('touchstart', this.touchStart, false)
      document.addEventListener('touchend', this.touchEnd, false)
      window.addEventListener('hashchange', this.hashChange, false)

      /**
       * Enable scroll if decive don't have touch support
       */
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        if (!('ontouchstart' in window)) {
          document.body.style = 'overflow: scroll;'
          document.documentElement.style = 'overflow: scroll;'
        }
      }
    } else {
      document.attachEvent('onmousewheel', this.mouseWheelAndKey, false)
      document.attachEvent('onkeyup', this.mouseWheelAndKey, false)
    }

    return this
  }

  /**
   * Build public functions
   * @return {[type]} [description]
   */
  fullScroll.prototype.buildPublicFunctions = function () {
    let mTouchStart = 0
    let mTouchEnd = 0
    let _self = this

    this.mouseWheelAndKey = function (event) {
      if (event.deltaY > 0 || event.keyCode == 40) {
        _self.defaults.currentPosition++
        _self.changeCurrentPosition(_self.defaults.currentPosition)
      } else if (event.deltaY < 0 || event.keyCode == 38) {
        _self.defaults.currentPosition--
        _self.changeCurrentPosition(_self.defaults.currentPosition)
      }
      _self.removeEvents()
    }

    this.touchStart = function (event) {
      mTouchStart = parseInt(event.changedTouches[0].clientY)
      mTouchEnd = 0
    }

    this.touchEnd = function (event) {
      mTouchEnd = parseInt(event.changedTouches[0].clientY)
      if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
        if (mTouchEnd > mTouchStart) {
          _self.defaults.currentPosition--
        } else {
          _self.defaults.currentPosition++
        }
        _self.changeCurrentPosition(_self.defaults.currentPosition)
      }
    }

    this.hashChange = function (event) {
      if (location) {
        const anchor = location.hash.replace('#', '').split('/')[0]
        if (anchor !== '') {
          if (anchor < 0) {
            _self.changeCurrentPosition(0)
          } else if (anchor > _self.defaults.maxPosition) {
            _self.changeCurrentPosition(_self.defaults.maxPosition)
          } else {
            _self.defaults.currentPosition = anchor
            _self.animateScroll()
          }
        }
      }
    }

    this.removeEvents = function () {
      if (document.addEventListener) {
        document.removeEventListener('mousewheel', this.mouseWheelAndKey, false)
        document.removeEventListener('wheel', this.mouseWheelAndKey, false)
        document.removeEventListener('keyup', this.mouseWheelAndKey, false)
        document.removeEventListener('touchstart', this.touchStart, false)
        document.removeEventListener('touchend', this.touchEnd, false)
      } else {
        document.detachEvent('onmousewheel', this.mouseWheelAndKey, false)
        document.detachEvent('onkeyup', this.mouseWheelAndKey, false)
      }

      setTimeout(function () {
        _self.addEvents()
      }, 600)
    }

    this.animateScroll = function () {
      const animateTime = this.defaults.animateTime
      const animateFunction = this.defaults.animateFunction
      const position = this.defaults.currentPosition * 100

      this.defaults.container.style.webkitTransform =
        'translateY(-' + position + '%)'
      this.defaults.container.style.mozTransform =
        'translateY(-' + position + '%)'
      this.defaults.container.style.msTransform =
        'translateY(-' + position + '%)'
      this.defaults.container.style.transform = 'translateY(-' + position + '%)'
      this.defaults.container.style.webkitTransition =
        'all ' + animateTime + 's ' + animateFunction
      this.defaults.container.style.mozTransition =
        'all ' + animateTime + 's ' + animateFunction
      this.defaults.container.style.msTransition =
        'all ' + animateTime + 's ' + animateFunction
      this.defaults.container.style.transition =
        'all ' + animateTime + 's ' + animateFunction

      for (let i = 0; i < this.ul.childNodes.length; i++) {
        this.ul.childNodes[i].firstChild.className = this.updateClass(
          2,
          'active',
          this.ul.childNodes[i].firstChild.className
        )
        if (i == this.defaults.currentPosition) {
          this.ul.childNodes[i].firstChild.className = this.updateClass(
            1,
            'active',
            this.ul.childNodes[i].firstChild.className
          )
        }
      }
    }

    this.changeCurrentPosition = function (position) {
      if (position !== '') {
        _self.defaults.currentPosition = position
        location.hash = _self.defaults.currentPosition
      }
    }

    this.registerIeTags = function () {
      document.createElement('section')
    }

    this.updateClass = function (type, newClass, currentClass) {
      if (type == 1) {
        return (currentClass += ' ' + newClass)
      } else if (type == 2) {
        return currentClass.replace(newClass, '')
      }
    }

    return this
  }
  window.fullScroll = fullScroll
})()

/////////////////////

new fullScroll({
  mainElement: 'main',
  displayDots: true,
  dotsPosition: 'right',
  animateTime: 0.8,
  animateFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
})
