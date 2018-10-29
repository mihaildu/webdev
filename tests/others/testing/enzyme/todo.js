/**
 * TODO put these somewhere
 */

it.skip('shallow rendering', () => {
  /* assume you have a react component */
  const myComp = (
    <div>
      <p className="p-class">
        hello from p
      </p>
      hello from outside p
    </div>
  )

  /* create a shallow rendering of the component */
  const wrapper = shallow(myComp);

  /* apparently you can print the entire html of the comp */
  console.log(wrapper.html())

  /**
   * you can look for specific stuff inside
   * like elements with a specific class
   */
  console.log(wrapper.find(".p-class").length);

  /* you can show the html having that class */
  console.log(wrapper.find(".p-class").html());

  /* or just the inner text */
  console.log(wrapper.find(".p-class").text());
})

it.skip('full rendering', () => {
  const myComp = (
    <div>
      <p className="p-class">
        hello from p
      </p>
      hello from outside p
    </div>
  )

  const wrapper = mount(myComp);

  /**
   * wrapper.props() = props + values
   * wrapper.setProps() = sets props
   * 
   */

  //console.log(wrapper.html());
  console.log(wrapper.render())
})
