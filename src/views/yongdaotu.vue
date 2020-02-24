<template>
  <div id="sample">
    <div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:700px;"></div>
    <button @click="relayoutLanes()">布局</button>
    <button id="SaveButton" @click="save()">保存</button>
    <button @click="load()">加载</button>
    <br />
    <!-- <textarea id="mySavedModel" style="width:100%;height:300px"></textarea> -->
    <editor ref="mySavedModel" v-model="content" @init="editorInit" lang="javascript" theme="xcode" width="100%" height="663"></editor>

    <div class="xl-chrome-ext-bar" id="xl_chrome_ext_{4DB361DE-01F7-4376-B494-639E489D19ED}" style="display: none;">
      <div class="xl-chrome-ext-bar__logo"></div>

      <a id="xl_chrome_ext_download" href="javascript:;" class="xl-chrome-ext-bar__option">下载视频</a>
      <a id="xl_chrome_ext_close" href="javascript:;" class="xl-chrome-ext-bar__close"></a>
    </div>
  </div>
</template>

<script>
let go = window.go
let $ = go.GraphObject.make
export default {
  data() {
    return {
      MINLENGTH: 200,
      MINBREADTH: 20,
      myDiagram: '',
      content: {
        class: 'GraphLinksModel',
        nodeDataArray: [
          { key: 'Pool1', text: 'Pool', isGroup: true, category: 'Pool', loc: '32.014286804199216 0.5' },
          { key: 'Pool2', text: 'Pool2', isGroup: true, category: 'Pool', loc: '32.014286804199216 484.5' },
          { key: 'Lane1', text: 'Lane1', isGroup: true, group: 'Pool1', color: 'lightblue', loc: '58.537134302507155 0.5', size: '538 101.51215820312501' },
          { key: 'Lane2', text: 'Lane2', isGroup: true, group: 'Pool1', color: 'lightgreen', loc: '58.537134302507155 103.5', size: '538 181.512158203125' },
          { key: 'Lane3', text: 'Lane3', isGroup: true, group: 'Pool1', color: 'lightyellow', size: '538 87.01357015455794', loc: '58.537134302507155 286.5', expanded: true },
          { key: 'Lane4', text: 'Lane4', isGroup: true, group: 'Pool1', color: 'orange', loc: '58.537134302507155 375.5', size: '538 87.01357015455794' },
          { key: 'oneA', group: 'Lane1', loc: '70.53713430250716 32.5' },
          { key: 'oneB', group: 'Lane1', loc: '159.60524953688216 12.5' },
          { key: 'oneC', group: 'Lane1', loc: '159.33547414625716 62.5' },
          { key: 'oneD', group: 'Lane1', loc: '247.68313039625718 32.5' },
          { key: 'twoA', group: 'Lane2', loc: '70.53713430250716 165.5' },
          { key: 'twoB', group: 'Lane2', loc: '159.32595266188216 115.5' },
          { key: 'twoC', group: 'Lane2', loc: '159.05617727125716 165.5' },
          { key: 'twoD', group: 'Lane2', loc: '247.12453664625718 165.5' },
          { key: 'twoE', group: 'Lane2', loc: '71.53689016188216 245.5' },
          { key: 'twoF', group: 'Lane2', loc: '159.95119680250716 215.5' },
          { key: 'twoG', group: 'Lane2', loc: '336.3989507087572 215.5' },
          { key: 'fourA', group: 'Lane4', loc: '70.53713430250716 387.5' },
          { key: 'fourB', group: 'Lane4', loc: '161.43020070875718 387.5' },
          { key: 'fourC', group: 'Lane4', loc: '251.33303274000718 387.5' },
          { key: 'fourD', group: 'Lane4', loc: '341.7754155525072 387.5' },
          { key: 'Lane5', text: 'Lane5', isGroup: true, group: 'Pool2', color: 'lightyellow', loc: '58.537134302507155 484.5', size: '545 87.01357015455794' },
          { key: 'Lane6', text: 'Lane6', isGroup: true, group: 'Pool2', color: 'lightgreen', loc: '58.537134302507155 573.5', size: '545 87.01357015455794' },
          { key: 'fiveA', group: 'Lane5', loc: '70.53713430250716 496.5' },
          { key: 'sixA', group: 'Lane6', loc: '70.53713430250716 585.5' }
        ],
        linkDataArray: [
          { from: 'oneA', to: 'oneB' },
          { from: 'oneA', to: 'oneC' },
          { from: 'oneB', to: 'oneD' },
          { from: 'oneC', to: 'oneD' },
          { from: 'twoA', to: 'twoB' },
          { from: 'twoA', to: 'twoC' },
          { from: 'twoA', to: 'twoF' },
          { from: 'twoB', to: 'twoD' },
          { from: 'twoC', to: 'twoD' },
          { from: 'twoD', to: 'twoG' },
          { from: 'twoE', to: 'twoG' },
          { from: 'twoF', to: 'twoG' },
          { from: 'fourA', to: 'fourB' },
          { from: 'fourB', to: 'fourC' },
          { from: 'fourC', to: 'fourD' }
        ]
      }
    }
  },
  mounted() {
    // 初始化edit
    this.editInit()
    this.init()
    this.load()
  },
  // 注册编辑器组件
  components: {
    editor: require('vue2-ace-editor')
  },
  created() {
    this.content = JSON.stringify(this.content, null, 2)
  },
  methods: {
    relayoutLanes() {
      this.myDiagram.nodes.each(function(lane) {
        if (!(lane instanceof go.Group)) return
        if (lane.category === 'Pool') return
        lane.layout.isValidLayout = false // force it to be invalid
      })
      this.myDiagram.layoutDiagram()
    },

    computeMinPoolSize(pool) {
      var len = this.MINLENGTH
      pool.memberParts.each(function(lane) {
        if (!(lane instanceof go.Group)) return
        var holder = lane.placeholder
        if (holder !== null) {
          var sz = holder.actualBounds
          len = Math.max(len, sz.width)
        }
      })
      return new go.Size(len, NaN)
    },
    computeLaneSize(lane) {
      var sz = this.computeMinLaneSize(lane)
      if (lane.isSubGraphExpanded) {
        var holder = lane.placeholder
        if (holder !== null) {
          var hsz = holder.actualBounds
          sz.height = Math.max(sz.height, hsz.height)
        }
      }
      // minimum breadth needs to be big enough to hold the header
      var hdr = lane.findObject('HEADER')
      if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height)
      return sz
    },
    computeMinLaneSize(lane) {
      if (!lane.isSubGraphExpanded) return new go.Size(this.MINLENGTH, 1)
      return new go.Size(this.MINLENGTH, this.MINBREADTH)
    },

    init() {
      function relayoutDiagram() {
        that.myDiagram.layout.invalidateLayout()
        that.myDiagram.findTopLevelGroups().each(function(g) {
          if (g.category === 'Pool') g.layout.invalidateLayout()
        })
        that.myDiagram.layoutDiagram()
      }
      function LaneResizingTool() {
        go.ResizingTool.call(this)
      }
      go.Diagram.inherit(LaneResizingTool, go.ResizingTool)
      LaneResizingTool.prototype.isLengthening = function() {
        return this.handle.alignment === go.Spot.Right
      }
      LaneResizingTool.prototype.computeMinSize = function() {
        var lane = this.adornedObject.part
        // assert(lane instanceof go.Group && lane.category !== "Pool");
        var msz = that.computeMinLaneSize(lane) // get the absolute minimum size
        if (this.isLengthening()) {
          // compute the minimum length of all lanes
          var sz = that.computeMinPoolSize(lane.containingGroup)
          msz.width = Math.max(msz.width, sz.width)
        } else {
          // find the minimum size of this single lane
          var sz1 = that.computeLaneSize(lane)
          msz.width = Math.max(msz.width, sz1.width)
          msz.height = Math.max(msz.height, sz1.height)
        }
        return msz
      }
      LaneResizingTool.prototype.resize = function(newr) {
        var lane = this.adornedObject.part
        if (this.isLengthening()) {
          // changing the length of all of the lanes
          lane.containingGroup.memberParts.each(function(lane) {
            if (!(lane instanceof go.Group)) return
            var shape = lane.resizeObject
            if (shape !== null) {
              // set its desiredSize length, but leave each breadth alone
              shape.width = newr.width
            }
          })
        } else {
          // changing the breadth of a single lane
          go.ResizingTool.prototype.resize.call(this, newr)
        }

        relayoutDiagram() // now that the lane has changed size, layout the pool again
      }

      function PoolLayout() {
        go.GridLayout.call(this)
        this.cellSize = new go.Size(1, 1)
        this.wrappingColumn = 1
        this.wrappingWidth = Infinity
        this.isRealtime = false
        this.alignment = go.GridLayout.Position

        this.comparer = function(a, b) {
          var ay = a.location.y
          var by = b.location.y
          if (isNaN(ay) || isNaN(by)) return 0
          if (ay < by) return -1
          if (ay > by) return 1
          return 0
        }
      }

      go.Diagram.inherit(PoolLayout, go.GridLayout)
      PoolLayout.prototype.doLayout = function(coll) {
        var diagram = this.diagram
        if (diagram === null) return
        diagram.startTransaction('PoolLayout')
        var pool = this.group
        if (pool !== null && pool.category === 'Pool') {
          // make sure all of the Group Shapes are big enough
          var minsize = that.computeMinPoolSize(pool)
          pool.memberParts.each(function(lane) {
            if (!(lane instanceof go.Group)) return
            if (lane.category !== 'Pool') {
              var shape = lane.resizeObject
              if (shape !== null) {
                // change the desiredSize to be big enough in both directions
                var sz = that.computeLaneSize(lane)
                shape.width = isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width)
                shape.height = !isNaN(shape.height) ? Math.max(shape.height, sz.height) : sz.height
                var cell = lane.resizeCellSize
                if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width
                if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height
              }
            }
          })
        }
        go.GridLayout.prototype.doLayout.call(this, coll)
        diagram.commitTransaction('PoolLayout')
      }

      var that = this
      that.myDiagram = $(go.Diagram, 'myDiagramDiv', {
        resizingTool: new LaneResizingTool(),
        layout: $(PoolLayout),
        mouseDragOver: function(e) {
          if (
            !e.diagram.selection.all(function(n) {
              return n instanceof go.Group
            })
          ) {
            e.diagram.currentCursor = 'not-allowed'
          }
        },
        mouseDrop: function(e) {
          if (
            !e.diagram.selection.all(function(n) {
              return n instanceof go.Group
            })
          ) {
            e.diagram.currentTool.doCancel()
          }
        },
        'commandHandler.copiesGroupKey': true,
        SelectionMoved: relayoutDiagram, // this DiagramEvent listener is
        SelectionCopied: relayoutDiagram, // defined above
        'animationManager.isEnabled': false,
        'undoManager.isEnabled': true
      })
      // eslint-disable-next-line no-unused-vars
      function stayInGroup(part, pt, gridpt) {
        // don't constrain top-level nodes
        var grp = part.containingGroup
        if (grp === null) return pt
        // try to stay within the background Shape of the Group
        var back = grp.resizeObject
        if (back === null) return pt
        // allow dragging a Node out of a Group if the Shift key is down
        if (part.diagram.lastInput.shift) return pt
        var p1 = back.getDocumentPoint(go.Spot.TopLeft)
        var p2 = back.getDocumentPoint(go.Spot.BottomRight)
        var b = part.actualBounds
        var loc = part.location
        // find the padding inside the group's placeholder that is around the member parts
        var m = grp.placeholder.padding
        // now limit the location appropriately
        let x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x - b.x)
        let y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y - b.y)
        return new go.Point(x, y)
      }
      that.myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle', { fill: 'white', portId: '', cursor: 'pointer', fromLinkable: true, toLinkable: true }),
        $(go.TextBlock, { margin: 15 }, new go.Binding('text', 'key')),
        { dragComputation: stayInGroup }
      )

      function groupStyle() {
        // common settings for both Lane and Pool Groups
        return [
          {
            layerName: 'Background', // all pools and lanes are always behind all nodes and links
            background: 'transparent', // can grab anywhere in bounds
            movable: true, // allows users to re-order by dragging
            copyable: false, // can't copy lanes or pools
            avoidable: false, // don't impede AvoidsNodes routed Links
            minLocation: new go.Point(NaN, -Infinity), // only allow vertical movement
            maxLocation: new go.Point(NaN, Infinity)
          },
          new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
        ]
      }

      function updateCrossLaneLinks(group) {
        group.findExternalLinksConnected().each(function(l) {
          l.visible = l.fromNode.isVisible() && l.toNode.isVisible()
        })
      }

      that.myDiagram.groupTemplate = $(
        go.Group,
        'Horizontal',
        groupStyle(),
        {
          selectionObjectName: 'SHAPE', // selecting a lane causes the body of the lane to be highlit, not the label
          resizable: true,
          resizeObjectName: 'SHAPE', // the custom resizeAdornmentTemplate only permits two kinds of resizing
          layout: $(
            go.LayeredDigraphLayout, // automatically lay out the lane's subgraph
            {
              isInitial: false, // don't even do initial layout
              isOngoing: false, // don't invalidate layout when nodes or links are added or removed
              direction: 0,
              columnSpacing: 10,
              layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
            }
          ),
          computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon
          computesBoundsIncludingLinks: false, // to reduce occurrences of links going briefly outside the lane
          computesBoundsIncludingLocation: true, // to support empty space at top-left corner of lane
          handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
          mouseDrop: function(e, grp) {
            // dropping a copy of some Nodes and Links onto this Group adds them to this Group
            if (!e.shift) return // cannot change groups with an unmodified drag-and-drop
            // don't allow drag-and-dropping a mix of regular Nodes and Groups
            if (
              !e.diagram.selection.any(function(n) {
                return n instanceof go.Group
              })
            ) {
              var ok = grp.addMembers(grp.diagram.selection, true)
              if (ok) {
                updateCrossLaneLinks(grp)
              } else {
                grp.diagram.currentTool.doCancel()
              }
            } else {
              e.diagram.currentTool.doCancel()
            }
          },
          subGraphExpandedChanged: function(grp) {
            var shp = grp.resizeObject
            if (grp.diagram.undoManager.isUndoingRedoing) return
            if (grp.isSubGraphExpanded) {
              shp.height = grp._savedBreadth
            } else {
              grp._savedBreadth = shp.height
              shp.height = NaN
            }
            updateCrossLaneLinks(grp)
          }
        },
        new go.Binding('isSubGraphExpanded', 'expanded').makeTwoWay(),
        // the lane header consisting of a Shape and a TextBlock
        $(
          go.Panel,
          'Horizontal',
          {
            name: 'HEADER',
            angle: 270, // maybe rotate the header to read sideways going up
            alignment: go.Spot.Center
          },
          $(
            go.Panel,
            'Horizontal', // this is hidden when the swimlane is collapsed
            new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
            $(go.Shape, 'Diamond', { width: 8, height: 8, fill: 'white' }, new go.Binding('fill', 'color')),
            $(
              go.TextBlock, // the lane label
              { font: 'bold 13pt sans-serif', editable: true, margin: new go.Margin(2, 0, 0, 0) },
              new go.Binding('text', 'text').makeTwoWay()
            )
          ),
          $('SubGraphExpanderButton', { margin: 5 }) // but this remains always visible!
        ), // end Horizontal Panel
        $(
          go.Panel,
          'Auto', // the lane consisting of a background Shape and a Placeholder representing the subgraph
          $(
            go.Shape,
            'Rectangle', // this is the resized object
            { name: 'SHAPE', fill: 'white' },
            new go.Binding('fill', 'color'),
            new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
          ),
          $(go.Placeholder, { padding: 12, alignment: go.Spot.TopLeft }),
          $(
            go.TextBlock, // this TextBlock is only seen when the swimlane is collapsed
            {
              name: 'LABEL',
              font: 'bold 13pt sans-serif',
              editable: true,
              angle: 0,
              alignment: go.Spot.TopLeft,
              margin: new go.Margin(2, 0, 0, 4)
            },
            new go.Binding('visible', 'isSubGraphExpanded', function(e) {
              return !e
            }).ofObject(),
            new go.Binding('text', 'text').makeTwoWay()
          )
        ) // end Auto Panel
      )
      that.myDiagram.groupTemplate.resizeAdornmentTemplate = $(
        go.Adornment,
        'Spot',
        $(go.Placeholder),
        $(
          go.Shape, // for changing the length of a lane
          {
            alignment: go.Spot.Right,
            desiredSize: new go.Size(7, 50),
            fill: 'lightblue',
            stroke: 'dodgerblue',
            cursor: 'col-resize'
          },
          new go.Binding('visible', '', function(ad) {
            if (ad.adornedPart === null) return false
            return ad.adornedPart.isSubGraphExpanded
          }).ofObject()
        ),
        $(
          go.Shape, // for changing the breadth of a lane
          {
            alignment: go.Spot.Bottom,
            desiredSize: new go.Size(50, 7),
            fill: 'lightblue',
            stroke: 'dodgerblue',
            cursor: 'row-resize'
          },
          new go.Binding('visible', '', function(ad) {
            if (ad.adornedPart === null) return false
            return ad.adornedPart.isSubGraphExpanded
          }).ofObject()
        )
      )
      that.myDiagram.groupTemplateMap.add(
        'Pool',
        $(
          go.Group,
          'Auto',
          groupStyle(),
          {
            // use a simple layout that ignores links to stack the "lane" Groups on top of each other
            layout: $(PoolLayout, { spacing: new go.Size(0, 0) }) // no space between lanes
          },
          $(go.Shape, { fill: 'white' }, new go.Binding('fill', 'color')),
          $(
            go.Panel,
            'Table',
            { defaultColumnSeparatorStroke: 'black' },
            $(
              go.Panel,
              'Horizontal',
              { column: 0, angle: 270 },
              $(go.TextBlock, { font: 'bold 16pt sans-serif', editable: true, margin: new go.Margin(2, 0, 0, 0) }, new go.Binding('text').makeTwoWay())
            ),
            $(go.Placeholder, { column: 1 })
          )
        )
      )
      that.myDiagram.linkTemplate = $(go.Link, { routing: go.Link.AvoidsNodes, corner: 5 }, { relinkableFrom: true, relinkableTo: true }, $(go.Shape), $(go.Shape, { toArrow: 'Standard' }))

      that.relayoutLanes()
    },

    save() {
      this.content = this.myDiagram.model.toJson()
      this.myDiagram.isModified = false
    },
    load() {
      this.myDiagram.model = go.Model.fromJson(this.content)
    },
    // 编辑器样式语言
    editorInit() {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/xcode')
      require('brace/snippets/javascript') // snippet
    },
    // 初始化init编辑器
    editInit() {
      let editor = this.$refs.mySavedModel.editor
      editor.setFontSize(20)
      // editor.setOption('wrap', 'free')
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true // 设置自动提示
      })
    }
  }
}
</script>

<style></style>
