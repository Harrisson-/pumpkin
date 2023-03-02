//@ts-check

const ALLSPECIALCHARACTERS = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

/**
 * cf : https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
 * @param {Node} node 
 */
function getRawNodeText(node) {
    switch(node.nodeType) {
        case 1: // ELEMENT_NODE
            return getRawElementNode(node);
        case 3: // TEXT_NODE
            return getRawTextNode(node);
    }
}

/**
 * 
 * @param {Node} node 
 */
function getRawTextNode(node) {
    return node.nodeValue;
}

/**
 * 
 * @param {Node} node 
 */
function getRawElementNode(node) {
    return retriveAllRawText(node).join('');
}

/**
 * @description loop over target chilnodes
 * @param {object} target
 * @returns {Array}
 */
function retriveAllRawText(target) {
    const text = [];
    for(let node of target.childNodes.values()) {
        text.push(getRawNodeText(node));
    }
    return text;
}

/**
 * cf : https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
 * @param {Node} node 
 */
function getcomplexNodedatas(node) {
    switch(node.nodeType) {
        case 1: // ELEMENT_NODE
            return getComplexElementNode(node);
        case 3: // TEXT_NODE
            return getComplexTextNode(node);
    }
}

/**
 * 
 * @param {Node} node 
 */
function getComplexTextNode(node) {
    return [{
        value: node.nodeValue,
        style: null,
        nodeType: node.nodeType, 
    }];
}

/**
 * 
 * @param {Node} node
 */
function getComplexElementNode(node) {
    const titi = [];
    for(let element of node.childNodes.values()) {
        titi.push({
            value: element.textContent,
            styles: element["attributes"],
            nodeType: node.nodeType,
        })
        getcomplexNodedatas(element);
    }
    return titi;
}


/**
 * @description loop over target chilnodes
 * @param {object} target
 * @returns {Array}
 */
function retrieveComplexText(target) {
    const text = [];
    for(let node of target.childNodes.values()) {
        text.push(getcomplexNodedatas(node));
    }
    /**
     * [ => 
     *  [ => line
     *      {
     *          value => raw text
     *          style => attributes.nodeValue
     *          type => type
     *          node => ?
     *      }
     *  ]
     * ]
     */
    return text;
}

/**
 * 
 * @param {Object} context 
 * @param {Object} textContainerDOM
 * @return
 */
function calculateCaretPosition(context, textContainerDOM) {
    const range = context.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(textContainerDOM.value);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
}

/**
 * 
 * @param {String} line 
 */
function isLineContainSpecialCharacters(line) {
    return ALLSPECIALCHARACTERS.test(line);
}

/**
 * return first special characher index in parameter or paramater length
 * @param {String} line 
 * @returns {Number}
 */
function firstSpecialCharacterMatchIndex(line) {
    const value = ALLSPECIALCHARACTERS.exec(line);
    return value ? value.index : line.length;
}

/**
 * 
 * @param {Node[] | NodeListOf<ChildNode>} targets
 */
function cleanAllTextNode(targets) {
    for(const [index, node] of targets.entries()) {
        if (node.nodeType === 3) {
            const newNode = document.createElement("span");
            newNode.innerHTML = node.nodeValue || '';
            targets[index].parentNode?.replaceChild(newNode, node);
        }
        cleanAllTextNode(node.childNodes);
    }
    return;
}


function createNewSpan(parentNode, content) {
    const node = document.createElement('span');
    node.innerHTML = content.length > 0 ? content : " ";
    parentNode.appendChild(node);
    return node;
}

function createNewTagSpan(parentNode, content, tagProperties) {
    const tagNode = document.createElement('span');
    tagNode.style.color = tagProperties.highlightColor;
    tagNode.innerHTML = content;
    parentNode.appendChild(tagNode);
    return tagNode;
}

function adaptNode(node, text) {
    if (node.nodeType === 3) {
        const spanNode = document.createElement('span');
        spanNode.textContent = text;
        node.parentNode.replaceChild(spanNode, node);
        return spanNode;
    }
    return node;
}

/**
 * 
 * @param { Element } node
 */
function rewriteDomLine(node, newLineText, customTag, tagProperties) {
    node = adaptNode(node, newLineText);
    node.innerHTML = '';
    const matches = newLineText.matchAll(customTag);
    let indexStep = 0;
    for (const match of matches) {
        const subtext = newLineText.substring(indexStep, match.index);
        createNewSpan(node, subtext);

        const sub = newLineText.substring(Number(match.index));
        const endTag = sub.search(/[ `!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
        let tag;
        if (endTag !== -1) {
            tag = newLineText.substring(Number(match.index), Number(match.index) + endTag);
        } else if ((newLineText.length - indexStep - (subtext + sub).length) === 0) {
            tag = sub;
        }
        createNewTagSpan(node, tag, tagProperties);
        
        indexStep = Number(match.index) + tag.length;
    }
    // create last text node if possible
    // Need a case to add empty span if tag is end of line
    if (indexStep < newLineText.length) {
        const subtext = newLineText.substring(indexStep)
        createNewSpan(node, subtext);
    }
}

export {
    calculateCaretPosition,
    retriveAllRawText,
    retrieveComplexText,
    isLineContainSpecialCharacters,
    firstSpecialCharacterMatchIndex,
    cleanAllTextNode,
    rewriteDomLine,
};