import React from "react";
import PropTypes from "prop-types";

/**
 * Simple button. This will be component main info in the styleguide.
 * You can also use `markdown` here.
 *
 * You can use @example instead of Button.md for examples.
 * It should look like this at the beginning of the line
 *
 * `@example path_to_md_file/file.md`
 *
 * You can use multiple jsdoc tags (e.g. for props)
 * like @deprecated, @see, @link, @author, @since, @version, @param, @arg, @argument
 */
class Button extends React.Component {
    /* PropTypes is also picked */
    static propTypes = {
        /**
         * This is decription for 'foo' prop.
         */
        foo: PropTypes.number,
        /**
         * If you want to ignore some prop from doc use @ignore
         * @ignore
         */
        bar: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * You can doc the methods too, use @public to make them show in doc.
     *
     * @param {Object} event
     * @public
     */
    handleClick(event) {
        console.log(this.props);
    }
    render() {
        return (
            <button onClick={this.handleClick}>Click me</button>
        );
    }
}

/*
 * you can also define propTypes here
 * however you can only define them once apparently
 * so either here on inside class as static
 * */
/* Button.propTypes = { */
/*     test: PropTypes.number */
/* }; */

export default Button;
